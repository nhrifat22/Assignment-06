# FitLog

A dark, no-nonsense gym companion. Browse a library of workouts, lock your favourite lifts into today's plan, save others for later, and track the total minutes and calories of your day.

**Live Site:** https://your-live-link.vercel.app
**GitHub:** https://github.com/nhrifat22/Assignment-06

## Technologies Used

- Next.js (App Router)
- React and TypeScript
- Tailwind CSS
- DaisyUI
- React Icons
- React Toastify

## Key Features

1. **Workout Library:** 12 workouts loaded from an API, shown as cards with tags, equipment, duration, calories and rating.
2. **Workout Details Page:** full instructions, key specs table and a large image for every lift.
3. **Today's Plan and Saved:** add a workout to today's plan or save it for later, with live counters in the navbar.
4. **My Plan Dashboard:** live totals for exercises, minutes and calories, with a Today's Plan / Saved tab and a Sort By dropdown (duration, calories, rating).
5. **Mark as Done and Remove:** finish or remove a workout and get an instant toast notification.
6. **Plan limit and persistence:** a maximum of five lifts per day, and all data is kept in localStorage so it survives a page reload.
7. **Fully responsive:** works on mobile, tablet and desktop, with a custom 404 page.

## Getting Started

```bash
git clone https://github.com/nhrifat22/Assignment-06.git
cd Assignment-06
npm install
npm run dev
```

Open http://localhost:3000 in your browser.