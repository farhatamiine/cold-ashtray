import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="eyebrow">The room is empty</p>
      <h1>Nothing is kept here.</h1>
      <Link className="text-link" href="/archive">
        Return to the archive →
      </Link>
    </div>
  );
}
