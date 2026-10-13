"use client";
import { useEffect, useState } from "react";
import { LuArrowDown } from "react-icons/lu";
import Loader from "@/components/Loader";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.log("Failed to load workouts", error);
      } finally {
        setLoading(false);
      }
    }

    getWorkouts();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="grid items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-10 md:py-16">
        <div className="space-y-4">
          <p className="text-xs tracking-widest text-brand">WORKOUT LIBRARY</p>

          <h1 className="display max-w-xl text-4xl md:text-6xl">
            Train with intent. Log every set.
          </h1>

          <p className="max-w-md text-sm text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan,
            and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-2 rounded bg-brand px-5 py-3 text-sm font-bold text-black"
          >
            BROWSE WORKOUTS <LuArrowDown />
          </a>
        </div>

        <img src="/banner.png" alt="Gym banner" className="mx-auto max-h-80 w-auto" />
      </section>

      {/* Library */}
      <section id="library" className="px-4 py-10 md:px-10">
        <h2 className="display text-3xl">The Library</h2>
        <p className="mb-6 text-sm text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}