#!/usr/bin/env python3
"""Inventory downloaded cold.ashtray assets and build visual contact sheets."""

from __future__ import annotations

import json
import math
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


NAME_PATTERN = re.compile(
    r"^cold\.ashtray_(?P<timestamp>\d+)_(?P<media_id>\d+)_(?P<user_id>\d+)(?: \(\d+\))?\.(?P<ext>jpe?g|png|webp|mp4)$",
    re.IGNORECASE,
)


def main() -> int:
    if len(sys.argv) != 4:
        print("usage: inventory_art.py SOURCE_DIR OUTPUT_JSON CONTACT_SHEET_DIR")
        return 2

    source_dir = Path(sys.argv[1]).expanduser().resolve()
    output_json = Path(sys.argv[2]).expanduser().resolve()
    sheet_dir = Path(sys.argv[3]).expanduser().resolve()
    sheet_dir.mkdir(parents=True, exist_ok=True)

    records: list[dict[str, object]] = []
    image_records: list[dict[str, object]] = []

    for path in sorted(source_dir.iterdir()):
        if not path.is_file():
            continue
        match = NAME_PATTERN.match(path.name)
        timestamp = int(match.group("timestamp")) if match else None
        record: dict[str, object] = {
            "filename": path.name,
            "bytes": path.stat().st_size,
            "kind": "video" if path.suffix.lower() == ".mp4" else "image",
            "timestamp": timestamp,
            "date": datetime.fromtimestamp(timestamp, tz=timezone.utc).date().isoformat()
            if timestamp
            else None,
            "mediaId": match.group("media_id") if match else None,
            "groupId": str(timestamp) if timestamp else path.stem,
        }
        if record["kind"] == "image":
            try:
                with Image.open(path) as image:
                    record["width"], record["height"] = image.size
                    record["mode"] = image.mode
                image_records.append(record)
            except OSError as exc:
                record["error"] = str(exc)
        records.append(record)

    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(records, indent=2), encoding="utf-8")
    make_contact_sheets(source_dir, image_records, sheet_dir)
    print(f"inventoried {len(records)} assets ({len(image_records)} images)")
    return 0


def make_contact_sheets(
    source_dir: Path, records: list[dict[str, object]], output_dir: Path
) -> None:
    columns = 5
    rows = 4
    per_sheet = columns * rows
    cell_width = 260
    image_height = 230
    label_height = 46
    background = (20, 18, 16)
    foreground = (225, 214, 191)
    accent = (178, 141, 74)
    font = ImageFont.load_default()

    for sheet_index in range(math.ceil(len(records) / per_sheet)):
        batch = records[sheet_index * per_sheet : (sheet_index + 1) * per_sheet]
        canvas = Image.new(
            "RGB", (columns * cell_width, rows * (image_height + label_height)), background
        )
        draw = ImageDraw.Draw(canvas)
        for index, record in enumerate(batch):
            path = source_dir / str(record["filename"])
            with Image.open(path) as opened:
                image = ImageOps.exif_transpose(opened).convert("RGB")
                image.thumbnail((cell_width - 18, image_height - 18), Image.Resampling.LANCZOS)
            column = index % columns
            row = index // columns
            x = column * cell_width + (cell_width - image.width) // 2
            y = row * (image_height + label_height) + (image_height - image.height) // 2
            canvas.paste(image, (x, y))
            label_y = row * (image_height + label_height) + image_height + 2
            item_number = sheet_index * per_sheet + index + 1
            draw.text((column * cell_width + 8, label_y), f"{item_number:03d}", fill=accent, font=font)
            draw.text(
                (column * cell_width + 42, label_y),
                f"{record.get('date', '')} · {record.get('groupId', '')}",
                fill=foreground,
                font=font,
            )
            draw.text(
                (column * cell_width + 8, label_y + 17),
                str(record["filename"])[-40:],
                fill=(150, 145, 135),
                font=font,
            )
        canvas.save(output_dir / f"contact-{sheet_index + 1:02d}.jpg", quality=88)


if __name__ == "__main__":
    raise SystemExit(main())
