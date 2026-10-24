#!/usr/bin/env python3
"""Prepare local Instagram downloads for the cold.ashtray portfolio."""

from __future__ import annotations

import json
import re
import shutil
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageOps


NAME_PATTERN = re.compile(
    r"^cold\.ashtray_(?P<timestamp>\d+)_(?P<media_id>\d+)_(?P<user_id>\d+)(?: \(\d+\))?\.(?P<ext>jpe?g|png|webp|mp4)$",
    re.IGNORECASE,
)

FEATURED = [
    "1792278928",
    "1773782597",
    "1766180595",
    "1775860703",
    "1777074656",
    "1772847752",
    "1771334444",
    "1770936249",
    "1766182753",
    "1786752874",
    "1784508106",
    "1772494476",
    "1766180788",
    "1766182371",
    "1772158987",
    "1784856889",
]

WRITING = {
    "1771431600",
    "1771812089",
    "1772158987",
    "1774194256",
    "1774212389",
    "1777074656",
    "1780512583",
    "1783729614",
    "1784856889",
}

ALT_TEXT = {
    "1792278928": "Three anatomical heads bound together with dark red cords.",
    "1773782597": "Two figures joined by exposed red anatomy.",
    "1766180595": "A central screaming face surrounded by anatomical profiles.",
    "1775860703": "A child resting against an emaciated, grieving figure.",
    "1777074656": "Two stripped figures supporting one another in a dark enclosure.",
    "1772847752": "Two figures entwined with an octopus.",
    "1771334444": "A skeletal figure collapsed across a wooden chair.",
    "1770936249": "A standing figure woven into branching black forms.",
    "1766182753": "Two anatomical figures holding one another.",
    "1786752874": "A seated woman in a flowing dress rendered in graphite.",
    "1784508106": "A hooded figure smoking, the face split into anatomical layers.",
    "1772494476": "A reclining figure beneath a wall of small portraits.",
    "1766180788": "Three fused heads emerging from a dark anatomical mass.",
    "1766182371": "Three anguished anatomical heads.",
    "1772158987": "An upside-down portrait with dark curls.",
    "1784856889": "A small room with an empty framed opening.",
}


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: prepare_art.py SOURCE_DIR PROJECT_DIR")
        return 2

    source = Path(sys.argv[1]).expanduser().resolve()
    project = Path(sys.argv[2]).expanduser().resolve()
    full_dir = project / "public" / "art" / "full"
    thumb_dir = project / "public" / "art" / "thumb"
    video_dir = project / "public" / "art" / "video"
    generated_dir = project / "app" / "generated"
    for directory in (full_dir, thumb_dir, video_dir, generated_dir):
        directory.mkdir(parents=True, exist_ok=True)

    groups: dict[str, list[dict[str, object]]] = defaultdict(list)
    seen_video_keys: set[tuple[str, int]] = set()

    for path in sorted(source.iterdir()):
        if not path.is_file():
            continue
        match = NAME_PATTERN.match(path.name)
        if not match:
            continue
        timestamp = int(match.group("timestamp"))
        group_id = str(timestamp)
        media_id = match.group("media_id")
        extension = match.group("ext").lower()

        if extension == "mp4":
            duplicate_key = (media_id, path.stat().st_size)
            if duplicate_key in seen_video_keys:
                continue
            seen_video_keys.add(duplicate_key)
            output_name = f"{group_id}-{media_id}.mp4"
            shutil.copy2(path, video_dir / output_name)
            groups[group_id].append(
                {
                    "type": "video",
                    "src": f"/art/video/{output_name}",
                    "filename": path.name,
                }
            )
            continue

        output_name = f"{group_id}-{media_id}.webp"
        full_path = full_dir / output_name
        thumb_path = thumb_dir / output_name
        with Image.open(path) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            original_width, original_height = image.size
            full = image.copy()
            full.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
            full.save(full_path, "WEBP", quality=88, method=6)
            thumb = image.copy()
            thumb.thumbnail((900, 900), Image.Resampling.LANCZOS)
            thumb.save(thumb_path, "WEBP", quality=82, method=6)
        groups[group_id].append(
            {
                "type": "image",
                "src": f"/art/full/{output_name}",
                "thumb": f"/art/thumb/{output_name}",
                "width": full.width,
                "height": full.height,
                "originalWidth": original_width,
                "originalHeight": original_height,
                "filename": path.name,
            }
        )

    posts: list[dict[str, object]] = []
    featured_rank = {group_id: rank for rank, group_id in enumerate(FEATURED)}
    for group_id, assets in groups.items():
        image_assets = [asset for asset in assets if asset["type"] == "image"]
        timestamp = int(group_id)
        date = datetime.fromtimestamp(timestamp, tz=timezone.utc).date().isoformat()
        alt = ALT_TEXT.get(group_id, f"Untitled work by cold.ashtray, {date}.")
        for asset in assets:
            asset["alt"] = alt if asset["type"] == "image" else "Untitled moving study."
        posts.append(
            {
                "id": group_id,
                "date": date,
                "timestamp": timestamp,
                "title": "Untitled",
                "caption": None,
                "featured": group_id in featured_rank,
                "featuredOrder": featured_rank.get(group_id),
                "writing": group_id in WRITING,
                "primary": image_assets[0] if image_assets else assets[0],
                "assets": assets,
            }
        )

    posts.sort(key=lambda post: int(post["timestamp"]), reverse=True)
    featured_posts = sorted(
        (post for post in posts if post["featured"]),
        key=lambda post: int(post["featuredOrder"]),
    )
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "count": len(posts),
        "assetCount": sum(len(post["assets"]) for post in posts),
        "featuredIds": FEATURED,
        "posts": posts,
        "featured": featured_posts,
    }
    (generated_dir / "artworks.json").write_text(
        json.dumps(payload, indent=2), encoding="utf-8"
    )
    print(f"prepared {payload['assetCount']} assets across {payload['count']} posts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
