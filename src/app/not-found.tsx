import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="display text-7xl text-brand md:text-9xl">404</h1>

      <h2 className="display mt-2 text-2xl">Page not found</h2>
      <p className="my-3 text-sm text-gray-400">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-3 inline-block rounded bg-brand px-6 py-3 text-sm font-bold text-black"
      >
        Back to workouts
      </Link>
    </div>
  );
}