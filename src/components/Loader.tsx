export default function Loader({ text = "Loading workouts…" }: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20">
      <span className="loading loading-spinner loading-lg text-accent"></span>
      <p className="text-gray-400">{text}</p>
    </div>
  );
}