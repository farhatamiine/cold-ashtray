"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categoryNotes, categoryOrder, type ArtworkCategory } from "@/app/curation";
import type { ArtworkPost } from "@/app/data";
import { formatDate } from "@/app/data";

type Filter = "All chambers" | ArtworkCategory;

export function ArchiveGrid({ posts }: { posts: ArtworkPost[] }) {
  const [filter, setFilter] = useState<Filter>("All chambers");
  const filtered = useMemo(() => {
    return filter === "All chambers"
      ? posts
      : posts.filter((post) => post.category === filter);
  }, [filter, posts]);

  const filters: Filter[] = ["All chambers", ...categoryOrder];

  return (
    <>
      <div className="archive-filter-panel">
        <div className="archive-filters" role="group" aria-label="Choose a museum chamber">
        {filters.map((name) => (
          <button
            key={name}
            type="button"
            className={filter === name ? "active" : ""}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
        </div>
        <p className="archive-filter-note" aria-live="polite">
          {filter === "All chambers"
            ? "Walk the complete collection, or enter a chamber by theme."
            : categoryNotes[filter]}
          <span>{filtered.length} entries</span>
        </p>
      </div>
      <div className="archive-grid">
        {filtered.map((post, index) => {
          const asset = post.primary;
          return (
            <Link className="archive-card" href={`/work/${post.id}`} key={post.id}>
              <div className="archive-image-wrap">
                {asset.type === "image" ? (
                  <Image
                    src={asset.thumb ?? asset.src}
                    alt={asset.alt}
                    width={asset.width ?? 900}
                    height={asset.height ?? 1200}
                    sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  />
                ) : (
                  <div className="video-placeholder">Moving study</div>
                )}
              </div>
              <div className="archive-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{post.category}</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.interpretation}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
