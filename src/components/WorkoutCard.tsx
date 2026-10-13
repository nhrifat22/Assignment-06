import Link from "next/link";
import WorkoutStats from "@/components/WorkoutStats";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block overflow-hidden rounded-xl border border-line bg-panel transition hover:border-accent/60"
    >
      <img src={workout.image} alt={workout.name} className="h-48 w-full object-cover" />

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="display text-lg">{workout.name}</h3>
        <p className="mb-3 text-xs text-gray-400">{workout.equipment}</p>

        <div className="border-t border-line pt-3">
          <WorkoutStats workout={workout} />
        </div>
      </div>
    </Link>
  );
}