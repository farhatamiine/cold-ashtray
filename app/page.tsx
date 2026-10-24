import Image from "next/image";
import Link from "next/link";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import { Reveal } from "@/components/Reveal";
import { featured, getPost } from "./data";

export default function Home() {
  const hero = getPost("1792278928") ?? featured[0];
  const writing = getPost("1777074656");
  const heroAsset = hero.primary;
  const writingAsset = writing?.assets.find((asset) => asset.type === "image");

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Drawings &amp; writings · 2025—2026</p>
          <h1 aria-label="cold dot ashtray">
            cold<span>.</span>
            <br />
            ashtray
          </h1>
          <p className="hero-intro">
            A private first exhibition.
            <br />
            Sixty entries. One evolving archive.
          </p>
          <a className="text-link" href="#selected">
            Descend to the works <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-label="Featured artwork">
          {heroAsset.type === "image" ? (
            <div className="hero-frame">
              <div className="hero-frame-liner">
                <div className="hero-frame-artwork">
                  <Image
                    className="hero-image"
                    src={heroAsset.src}
                    alt={heroAsset.alt}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 800px) 82vw, 34vw"
                  />
                </div>
              </div>
            </div>
          ) : null}
          <div className="hero-plaque">
            <span>{hero.title}</span>
            <span>2026</span>
          </div>
        </div>
        <div className="gold-thread" aria-hidden="true" />
      </section>

      <section className="exhibition-intro" id="selected">
        <Reveal>
          <p className="section-index">I · Selected works</p>
          <h2>The work enters before the explanation.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p>
            Five chambers for bodies, bonds, faces, memories, and pages. Each work is named and
            accompanied by a short reading drawn from the image and the artist&apos;s own language.
          </p>
        </Reveal>
      </section>

      <section className="selected-section" aria-label="Selected works">
        <FeaturedWorks posts={featured} />
      </section>

      {writing && writingAsset ? (
        <section className="writing-chamber">
          <Reveal className="writing-copy">
            <p className="section-index">II · Writings</p>
            <h2>Pages kept in their original hand.</h2>
            <p>
              The pages reveal the vocabulary behind the drawings: the body as a house, intimacy
              as refuge, memory as evidence, and grief hiding inside ordinary time.
            </p>
            <Link className="text-link" href="/writings">
              Enter the writing chamber <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal className="writing-preview" delay={80}>
            <Image
              src={writingAsset.src}
              alt={writingAsset.alt}
              fill
              sizes="(max-width: 800px) 90vw, 44vw"
            />
          </Reveal>
        </section>
      ) : null}

      <section className="archive-callout">
        <Reveal>
          <p className="section-index">III · The archive</p>
          <h2>Every post. Every surviving fragment.</h2>
          <Link className="archive-door" href="/archive">
            <span>Open the full archive</span>
            <span aria-hidden="true">60 entries ↗</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
