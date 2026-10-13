import { LuClock, LuFlame, LuStar } from "react-icons/lu";
import { Workout } from "@/types/workout";

type Props = {
  workout: Workout;
};

export default function WorkoutStats({ workout }: Props) {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-gray-300">
      <span className="flex items-center gap-1">
        <LuClock className="text-brand" /> {workout.duration} min
      </span>

      <span className="flex items-center gap-1">
        <LuFlame className="text-brand" /> {workout.caloriesBurned} kcal
      </span>

      <span className="flex items-center gap-1">
        <LuStar className="text-brand" /> {workout.rating}
      </span>
    </div>
  );
}