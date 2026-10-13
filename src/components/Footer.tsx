export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-line bg-black/40 px-4 py-6 text-sm text-gray-400 md:flex-row md:px-10">
      <img src="/logo.png" alt="FitLog" className="h-6 w-auto" />
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}