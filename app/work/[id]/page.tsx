import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "../../data";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getPost(id);
  return post ? { title: `${post.title} · ${formatDate(post.date)}` } : {};
}

export default async function WorkPage({ params }: Props) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) notFound();

  const postIndex = posts.findIndex((entry) => entry.id === id);
  const previous = posts[(postIndex - 1 + posts.length) % posts.length];
  const next = posts[(postIndex + 1) % posts.length];

  return (
    <article className="work-page">
      <header className="work-heading">
        <Link href="/archive">← Archive</Link>
        <div>
          <p className="eyebrow">Entry {String(postIndex + 1).padStart(2, "0")}</p>
          <h1>{post.title}</h1>
        </div>
        <dl>
          <div>
            <dt>Date</dt>
            <dd>{formatDate(post.date)}</dd>
          </div>
          <div>
            <dt>Chamber</dt>
            <dd>{post.category}</dd>
          </div>
        </dl>
      </header>

      <section className="work-interpretation" aria-label="Curatorial interpretation">
        <p className="section-index">A reading of the work</p>
        <p>{post.interpretation}</p>
        <span>{post.assets.length > 1 ? `${post.assets.length} fragments` : "Single work"}</span>
      </section>

      <div className="work-assets">
        {post.assets.map((asset, index) => (
          <figure key={asset.src}>
            {asset.type === "image" ? (
              <Image
                src={asset.src}
                alt={asset.alt}
                width={asset.width ?? 1600}
                height={asset.height ?? 2000}
                sizes="(max-width: 900px) 96vw, 78vw"
                priority={index === 0}
              />
            ) : (
              <video src={asset.src} controls playsInline preload="metadata">
                Your browser does not support this moving study.
              </video>
            )}
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{index === 0 ? "Work" : "Fragment"}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <nav className="work-pagination" aria-label="Adjacent archive entries">
        <Link href={`/work/${previous.id}`}>
          <span>Previous</span>
          <strong>{previous.title} · {formatDate(previous.date)}</strong>
        </Link>
        <Link href={`/work/${next.id}`}>
          <span>Next</span>
          <strong>{next.title} · {formatDate(next.date)}</strong>
        </Link>
      </nav>
    </article>
  );
}
