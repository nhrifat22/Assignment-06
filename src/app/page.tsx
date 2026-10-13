import { LuArrowDown } from "react-icons/lu";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="grid items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-10 md:py-16">
        <div className="space-y-4">
          <p className="text-xs tracking-widest text-brand">WORKOUT LIBRARY</p>
          <h1 className="display text-4xl md:text-6xl">Train with intent. Log every set.</h1>
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

      {/* Library section Step 3 e ashbe */}
      <section id="library" className="px-4 py-10 md:px-10">
        <h2 className="display text-3xl">The Library</h2>
        <p className="text-sm text-gray-400">Twelve lifts covering every major muscle group.</p>
      </section>
    </div>
  );
}