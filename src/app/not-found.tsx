import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="display text-7xl text-brand">404</h1>
      <p className="my-3 text-gray-400">Page not found</p>
      <Link href="/" className="inline-block rounded bg-brand px-5 py-3 font-bold text-black">
        Back to Home
      </Link>
    </div>
  );
}