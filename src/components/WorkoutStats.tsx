import { LuClock, LuFlame, LuStar } from "react-icons/lu";
import { Workout } from "@/types/workout";

export default function WorkoutStats({ workout }: { workout: Workout }) {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-gray-300">
      <span className="flex items-center gap-1">
        <LuClock className="text-accent" /> {workout.duration} min
      </span>
      <span className="flex items-center gap-1">
        <LuFlame className="text-accent" /> {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1">
        <LuStar className="text-accent" /> {workout.rating}
      </span>
    </div>
  );
}