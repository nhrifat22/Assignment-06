"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Workout, PlanItem } from "@/types/workout";

type PlanContextType = {
  plan: PlanItem[];
  saved: Workout[];
  loaded: boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  markDone: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider");
  return context;
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  // page load e localStorage theke data ana
  useEffect(() => {
    const oldPlan = localStorage.getItem("plan");
    const oldSaved = localStorage.getItem("saved");
    if (oldPlan) setPlan(JSON.parse(oldPlan));
    if (oldSaved) setSaved(JSON.parse(oldSaved));
    setLoaded(true);
  }, []);

  // data change hole localStorage e save
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("plan", JSON.stringify(plan));
    localStorage.setItem("saved", JSON.stringify(saved));
  }, [plan, saved, loaded]);

  function addToPlan(workout: Workout) {
    if (plan.find((w) => w.id === workout.id)) {
      toast.info("Already in today's plan");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Plan full! Maximum 5 lifts");
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  }

  function addToSaved(workout: Workout) {
    if (saved.find((w) => w.id === workout.id)) {
      toast.info("Already saved");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later");
  }

  function markDone(id: number) {
    setPlan(plan.map((w) => (w.id === id ? { ...w, done: true } : w)));
    toast.success("Marked as done");
  }

  function removeFromPlan(id: number) {
    setPlan(plan.filter((w) => w.id !== id));
    toast.warn("Removed from plan");
  }

  function removeFromSaved(id: number) {
    setSaved(saved.filter((w) => w.id !== id));
    toast.warn("Removed from saved");
  }

  return (
    <PlanContext.Provider
      value={{ plan, saved, loaded, addToPlan, addToSaved, markDone, removeFromPlan, removeFromSaved }}
    >
      {children}
      <ToastContainer position="top-right" theme="dark" />
    </PlanContext.Provider>
  );
}