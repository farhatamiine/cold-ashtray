import raw from "./generated/artworks.json";
import { curation, type ArtworkCategory } from "./curation";

export type ArtAsset = {
  type: "image" | "video";
  src: string;
  thumb?: string;
  width?: number;
  height?: number;
  originalWidth?: number;
  originalHeight?: number;
  filename: string;
  alt: string;
};

export type ArtworkPost = {
  id: string;
  date: string;
  timestamp: number;
  title: string;
  interpretation: string;
  category: ArtworkCategory;
  caption: string | null;
  featured: boolean;
  featuredOrder: number | null;
  writing: boolean;
  primary: ArtAsset;
  assets: ArtAsset[];
};

type GeneratedArtworkPost = Omit<ArtworkPost, "title" | "interpretation" | "category"> & {
  title: string;
};

type ArtPayload = {
  generatedAt: string;
  count: number;
  assetCount: number;
  featuredIds: string[];
  posts: GeneratedArtworkPost[];
  featured: GeneratedArtworkPost[];
};

export const art = raw as ArtPayload;
export const posts: ArtworkPost[] = art.posts.map((post) => {
  const entry = curation[post.id];
  if (!entry) {
    throw new Error(`Missing curatorial entry for artwork ${post.id}`);
  }

  const curateAsset = (asset: ArtAsset): ArtAsset => ({
    ...asset,
    alt: asset.alt.startsWith("Untitled")
      ? `${entry.title}, an artwork by cold.ashtray.`
      : asset.alt,
  });

  return {
    ...post,
    ...entry,
    primary: curateAsset(post.primary),
    assets: post.assets.map(curateAsset),
  };
});
export const featured = posts
  .filter((post) => post.featured)
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
export const writings = posts.filter((post) => post.writing);

export function getPost(id: string) {
  return posts.find((post) => post.id === id);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
