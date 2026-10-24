import type { Metadata } from "next";
import { ArchiveGrid } from "@/components/ArchiveGrid";
import { posts } from "../data";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  return (
    <div className="page-shell archive-page">
      <header className="page-heading">
        <p className="eyebrow">The complete first exhibition</p>
        <h1>Five chambers.<br />Sixty entries.</h1>
        <p>
          Walk the collection by theme. Each title and interpretation responds to the image itself
          and to the artist&apos;s writing on the body, memory, intimacy, and grief.
        </p>
      </header>
      <ArchiveGrid posts={posts} />
    </div>
  );
}
