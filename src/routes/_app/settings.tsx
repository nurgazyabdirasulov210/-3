import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { Button } from "@/components/ui/button";
import { speakEnglish } from "@/lib/speak";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

const goals = [30, 50, 80];

function SettingsPage() {
  const name = useProgress((s) => s.name);
  const dailyGoal = useProgress((s) => s.dailyGoal);
  const speechRate = useProgress((s) => s.speechRate);
  const setName = useProgress((s) => s.setName);
  const setDailyGoal = useProgress((s) => s.setDailyGoal);
  const setSpeechRate = useProgress((s) => s.setSpeechRate);
  const resetProgress = useProgress((s) => s.resetProgress);

  return (
    <Screen>
      <ScreenHeader title="Настройки" backTo="/profile" icon="settings" />
      <label className="mt-2 block text-sm font-medium" htmlFor="settings-name">
        Имя
      </label>
      <input
        id="settings-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="mt-2 h-12 w-full rounded-md bg-surface px-4 shadow-border outline-none focus:ring-2 focus:ring-primary/40"
      />
      <p className="mt-5 text-sm font-medium">Цель на день</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {goals.map((goal) => (
          <button
            key={goal}
            type="button"
            onClick={() => setDailyGoal(goal)}
            className={cn(
              "h-12 rounded-md text-sm font-semibold shadow-border",
              dailyGoal === goal ? "bg-primary text-primary-fg" : "bg-surface",
            )}
          >
            {goal} XP
          </button>
        ))}
      </div>
      <p className="mt-5 text-sm font-medium">Скорость речи</p>
      <input
        type="range"
        min={0.7}
        max={1.1}
        step={0.05}
        value={speechRate}
        onChange={(event) => setSpeechRate(Number(event.target.value))}
        className="mt-3 w-full accent-primary"
      />
      <Button className="mt-3" variant="secondary" onClick={() => speakEnglish("Hello! Nice to meet you.", speechRate)}>
        Прослушать пример
      </Button>
      <div className="mt-8 rounded-xl bg-surface p-4 shadow-border">
        <p className="font-semibold">Сбросить прогресс</p>
        <p className="mt-1 text-sm text-muted">Серия, опыт, словарь и рекорды обнулятся. Имя сохранится.</p>
        <Button className="mt-4" variant="danger" onClick={resetProgress}>
          Сбросить
        </Button>
      </div>
    </Screen>
  );
}
