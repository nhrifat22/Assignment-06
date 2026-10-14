"use client";
import { useState } from "react";
import Link from "next/link";
import { LuCheck, LuX, LuChevronDown } from "react-icons/lu";
import Loader from "@/components/Loader";
import WorkoutStats from "@/components/WorkoutStats";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

// Plan er workout e "done" ache, Saved er workout e nai, tai done optional
type Item = Workout & { done?: boolean };

type SortType = "duration" | "calories" | "rating";

function sortItems(items: Item[], sortBy: SortType) {
  const copy = [...items];

  if (sortBy === "duration") {
    return copy.sort((a, b) => a.duration - b.duration);
  }
  if (sortBy === "calories") {
    return copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  }
  return copy.sort((a, b) => b.rating - a.rating);
}

export default function MyPlan() {
  const { plan, saved, loaded, markDone, removeFromPlan, removeFromSaved } = usePlan();

  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortType>("duration");

  if (!loaded) return <Loader />;

  // kon tab e achi shei onujayi list
  const currentList: Item[] = tab === "plan" ? plan : saved;
  const items = sortItems(currentList, sortBy);

  // Metrics shob shomoy Today's Plan theke hisab hobe
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  function tabClass(name: string) {
    if (tab === name) return "rounded-lg bg-white/10 px-4 py-1.5 text-sm font-bold";
    return "rounded-lg px-4 py-1.5 text-sm text-gray-400";
  }

  function handleRemove(id: number) {
    if (tab === "plan") removeFromPlan(id);
    else removeFromSaved(id);
  }

  return (
    <div className="px-4 py-10 md:px-10">
      <h1 className="display text-4xl">My Plan</h1>
      <p className="mb-6 text-sm text-gray-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics: ekta card, 3 ta column */}
      <div className="mb-8 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-panel py-5">
        <div className="px-4 md:px-6">
          <p className="text-xs text-gray-400">Exercises</p>
          <p className="display text-3xl text-brand md:text-4xl">{plan.length}</p>
        </div>
        <div className="px-4 md:px-6">
          <p className="text-xs text-gray-400">Minutes</p>
          <p className="display text-3xl md:text-4xl">{totalMinutes}</p>
        </div>
        <div className="px-4 md:px-6">
          <p className="text-xs text-gray-400">Calories</p>
          <p className="display text-3xl md:text-4xl">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl border border-line bg-panel p-1">
          <button onClick={() => setTab("plan")} className={tabClass("plan")}>
            Today's Plan
          </button>
          <button onClick={() => setTab("saved")} className={tabClass("saved")}>
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          Sort By
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="appearance-none rounded-lg border border-line bg-panel py-1.5 pl-3 pr-8 text-white"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <LuChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line py-20 text-center">
          <h2 className="display text-2xl">Nothing here yet</h2>
          <p className="my-2 text-sm text-gray-400">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-3 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-black"
          >
            Go to workouts
          </Link>
        </div>
      )}

      {/* Workout list */}
      <div className="space-y-4">
        {items.map((w) => (
          <div
            key={w.id}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-3 sm:flex-row sm:items-center"
          >
            <img src={w.image} alt={w.name} className="h-20 w-full rounded-lg object-cover sm:w-28" />

            <div className="flex-1 space-y-1">
              <h3 className={`display text-lg ${w.done ? "line-through opacity-50" : ""}`}>
                {w.name}
              </h3>
              <p className="text-xs text-gray-400">{w.equipment}</p>
              <WorkoutStats workout={w} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/workout/${w.id}`}
                className="rounded-full border border-line px-4 py-2 text-sm"
              >
                View Details
              </Link>

              {/* Mark as Done shudhu Today's Plan e */}
              {tab === "plan" && (
                <button
                  onClick={() => markDone(w.id)}
                  disabled={w.done}
                  className="flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-sm font-bold text-black disabled:opacity-50"
                >
                  <LuCheck /> {w.done ? "Done" : "Mark as Done"}
                </button>
              )}

              <button
                onClick={() => handleRemove(w.id)}
                className="p-2 text-gray-400 hover:text-white"
                aria-label="Remove"
              >
                <LuX />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}