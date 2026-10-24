import Image from "next/image";
import Link from "next/link";
import type { ArtworkPost } from "@/app/data";
import { formatDate } from "@/app/data";
import { Reveal } from "./Reveal";

const SHAPES = ["tall", "wide", "standard", "tall", "standard", "wide"];

export function FeaturedWorks({ posts }: { posts: ArtworkPost[] }) {
  return (
    <div className="featured-grid">
      {posts.map((post, index) => {
        const asset = post.primary;
        if (asset.type !== "image") return null;
        return (
          <Reveal
            className={`featured-item shape-${SHAPES[index % SHAPES.length]}`}
            delay={(index % 3) * 60}
            key={post.id}
          >
            <Link href={`/work/${post.id}`}>
              <div className="featured-frame">
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  sizes="(max-width: 780px) 92vw, 46vw"
                />
                <span className="frame-corner top-left" />
                <span className="frame-corner top-right" />
                <span className="frame-corner bottom-left" />
                <span className="frame-corner bottom-right" />
              </div>
              <div className="featured-caption">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{post.title}</span>
                <span>{formatDate(post.date)}</span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
