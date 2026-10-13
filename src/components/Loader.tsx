export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-3 py-20">
      <span className="loading loading-spinner loading-lg text-brand"></span>
      <p className="text-gray-400">Loading workouts…</p>
    </div>
  );
}