import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate, writings } from "../data";

export const metadata: Metadata = { title: "Writings" };

export default function WritingsPage() {
  return (
    <div className="page-shell writings-page">
      <header className="page-heading">
        <p className="eyebrow">The writing chamber</p>
        <h1>Written without a frame.</h1>
        <p>
          Original pages remain intact. Their titles and short readings connect the written voice
          to the recurring images of flesh, memory, distance, and grief.
        </p>
      </header>
      <div className="writing-list">
        {writings.map((post, index) => (
          <section className="writing-entry" key={post.id}>
            <div className="writing-entry-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{formatDate(post.date)}</span>
              <strong>{post.title}</strong>
              <Link href={`/work/${post.id}`}>View entry ↗</Link>
            </div>
            <div className="writing-assets">
              <div className="writing-entry-intro">
                <p className="section-index">Curatorial note</p>
                <p>{post.interpretation}</p>
              </div>
              {post.assets
                .filter((asset) => asset.type === "image")
                .map((asset) => (
                  <Image
                    key={asset.src}
                    src={asset.src}
                    alt={asset.alt}
                    width={asset.width ?? 1200}
                    height={asset.height ?? 1600}
                    sizes="(max-width: 800px) 92vw, 68vw"
                  />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
