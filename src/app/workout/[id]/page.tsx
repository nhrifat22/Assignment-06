"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LuCalendarCheck, LuBookmark } from "react-icons/lu";
import Loader from "@/components/Loader";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

export default function WorkoutDetails() {
  const { id } = useParams<{ id: string }>();
  const { plan, addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkout() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (error) {
        console.log("Failed to load workout", error);
      } finally {
        setLoading(false);
      }
    }

    getWorkout();
  }, [id]);

  if (loading) return <Loader />;

  if (!workout || !workout.name) {
    return <p className="p-10 text-center text-gray-400">Workout not found</p>;
  }

  // Key Specs table er data
  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  // Plan e 5 ta hoye gele button bondho
  const planIsFull = plan.length >= 5;

  return (
    <div className="grid gap-8 px-4 py-10 md:grid-cols-2 md:px-10">
      {/* Left: image */}
      <img src={workout.image} alt={workout.name} className="w-full rounded-2xl object-cover" />

      {/* Right: details */}
      <div className="space-y-5">
        <h1 className="display text-3xl md:text-4xl">{workout.name}</h1>
        <p className="text-gray-400">{workout.description}</p>

        {/* Tags */}
        <div className="flex gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand px-3 py-0.5 text-xs font-bold text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Key specs */}
        <div className="rounded-xl border border-line bg-panel">
          {specs.map((item) => (
            <div
              key={item.label}
              className="flex justify-between border-b border-line px-5 py-3 text-sm last:border-0"
            >
              <span className="text-xs tracking-wider text-gray-400">{item.label}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div>
          <h3 className="mb-2 text-sm font-bold tracking-wider">INSTRUCTIONS</h3>
          <ol className="space-y-2 text-sm text-gray-300">
            {workout.instructions.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-gray-400">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(workout)}
            disabled={planIsFull}
            className="flex items-center gap-2 rounded bg-brand px-5 py-3 text-sm font-bold text-black disabled:opacity-50"
          >
            <LuCalendarCheck /> Add to today's plan
          </button>

          <button
            onClick={() => addToSaved(workout)}
            className="flex items-center gap-2 rounded border border-line px-5 py-3 text-sm"
          >
            <LuBookmark /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { LuCalendarCheck, LuBookmark } from "react-icons/lu";
// import Loader from "@/components/Loader";
// import { usePlan } from "@/context/PlanContext";
// import { Workout } from "@/types/workout";

// export default function WorkoutDetails() {
//   const { id } = useParams<{ id: string }>();
//   const { plan, addToPlan, addToSaved } = usePlan();
//   const [workout, setWorkout] = useState<Workout | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
//       .then((res) => res.json())
//       .then((data: Workout) => {
//         setWorkout(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   if (loading) return <Loader />;
//   if (!workout || !workout.name) return <p className="p-10 text-center">Workout not found</p>;

//   const specs = [
//     ["EQUIPMENT", workout.equipment],
//     ["DIFFICULTY", workout.difficulty],
//     ["SETS", workout.sets],
//     ["REPS", workout.reps],
//     ["DURATION", `${workout.duration} min`],
//     ["CALORIES", `${workout.caloriesBurned} kcal`],
//     ["RATING", workout.rating],
//   ];

//   const planFull = plan.length >= 5;

//   return (
//     <div className="grid gap-8 px-4 py-10 md:grid-cols-2 md:px-10">
//       {/* Left */}
//       <img src={workout.image} alt={workout.name} className="w-full rounded-2xl object-cover" />

//       {/* Right */}
//       <div className="space-y-5">
//         <h1 className="display text-3xl md:text-4xl">{workout.name}</h1>
//         <p className="text-gray-400">{workout.description}</p>

//         <div className="flex gap-2">
//           {workout.muscleGroups.map((tag) => (
//             <span key={tag} className="rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-black">
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Specs */}
//         <div className="rounded-xl border border-line bg-panel">
//           {specs.map(([label, value]) => (
//             <div
//               key={label}
//               className="flex justify-between border-b border-line px-5 py-3 text-sm last:border-0"
//             >
//               <span className="text-xs tracking-wider text-gray-400">{label}</span>
//               <span>{value}</span>
//             </div>
//           ))}
//         </div>

//         {/* Instructions */}
//         <div>
//           <h3 className="mb-2 text-sm font-bold tracking-wider">INSTRUCTIONS</h3>
//           <ol className="space-y-2 text-sm">
//             {workout.instructions.map((step, i) => (
//               <li key={i} className="flex gap-3">
//                 <span className="text-gray-400">{i + 1}.</span>
//                 <span className="text-gray-300">{step}</span>
//               </li>
//             ))}
//           </ol>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-wrap gap-3">
//           <button
//             onClick={() => addToPlan(workout)}
//             disabled={planFull}
//             className="flex items-center gap-2 rounded bg-accent px-5 py-3 text-sm font-bold text-black disabled:opacity-50"
//           >
//             <LuCalendarCheck /> Add to today's plan
//           </button>
//           <button
//             onClick={() => addToSaved(workout)}
//             className="flex items-center gap-2 rounded border border-line px-5 py-3 text-sm"
//           >
//             <LuBookmark /> Save for later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }