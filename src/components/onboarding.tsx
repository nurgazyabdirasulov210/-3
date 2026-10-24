import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

const goals = [
  { xp: 30, label: "Спокойно", hint: "3–4 минуты" },
  { xp: 50, label: "Обычно", hint: "5–7 минут" },
  { xp: 80, label: "Интенсивно", hint: "около 10 минут" },
];

export function Onboarding() {
  const markOnboarded = useProgress((s) => s.markOnboarded);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(50);

  return (
    <div className="flex min-h-dvh justify-center bg-bg">
      <div className="flex min-h-dvh w-full max-w-md flex-col justify-center bg-surface-2 px-6 py-10">
        <div className="grid size-14 place-items-center rounded-lg bg-primary text-primary-fg">
          <GraduationCap className="size-7" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">English Start</h1>
        <p className="mt-2 text-muted">Простой курс английского с нуля: слова, речь, грамматика и игры.</p>
        <label className="mt-8 text-sm font-medium" htmlFor="name">
          Как к тебе обращаться?
        </label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Имя"
          className="mt-2 h-12 rounded-md bg-surface px-4 text-base shadow-border outline-none focus:ring-2 focus:ring-primary/40"
        />
        <p className="mt-6 text-sm font-medium">Цель на день</p>
        <div className="mt-2 grid gap-2">
          {goals.map((item) => (
            <button
              key={item.xp}
              type="button"
              onClick={() => setGoal(item.xp)}
              className={cn(
                "flex items-center justify-between rounded-md bg-surface px-4 py-3 text-left shadow-border transition-shadow duration-150",
                goal === item.xp && "ring-2 ring-primary",
              )}
            >
              <span className="font-medium">{item.label}</span>
              <span className="text-sm text-muted">{item.hint}</span>
            </button>
          ))}
        </div>
        <Button className="mt-8" size="lg" onClick={() => markOnboarded(name, goal)}>
          Начать
        </Button>
      </div>
    </div>
  );
}
