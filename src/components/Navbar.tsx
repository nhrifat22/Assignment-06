"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  // Home ar Details page e "Workouts" active thakbe
  const workoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const planActive = pathname === "/my-plan";

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm ${
      active ? "bg-brand/15 text-brand" : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 md:px-10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="FitLog" className="h-8 w-auto" />
        <span className="display text-xl">FitLog</span>
      </Link>

      {/* Middle links */}
      <div className="flex gap-2">
        <Link href="/" className={linkClass(workoutsActive)}>
          Workouts
        </Link>
        <Link href="/my-plan" className={linkClass(planActive)}>
          My Plan
        </Link>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-4 text-sm">
        <Link href="/my-plan" className="flex items-center gap-2">
          Plan
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-black">
            {plan.length}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2">
          Saved
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-gray-500 px-1 text-xs">
            {saved.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}