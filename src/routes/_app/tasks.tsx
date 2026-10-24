import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/lib/icons";
import { grammarUnits } from "@/lib/content";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/utils";
import { tileTone } from "@/components/word-art";

export const Route = createFileRoute("/_app/tasks")({
  component: TasksPage,
});

function TasksPage() {
  const completed = useProgress((s) => s.completed);
  const [openId, setOpenId] = useState<string | null>(grammarUnits[0]?.id ?? null);

  return (
    <Screen>
      <ScreenHeader title="Задания" icon="pencil" />
      <p className="text-sm text-muted">Короткое правило, затем упражнения на выбор.</p>
      <div className="mt-4 space-y-2">
        {grammarUnits.map((unit) => {
          const open = openId === unit.id;
          const done = completed.includes(`grammar:${unit.id}`);
          return (
            <div key={unit.id} className="rounded-xl bg-surface p-4 shadow-border">
              <button
                type="button"
                className="flex w-full items-center gap-3 text-left"
                onClick={() => setOpenId(open ? null : unit.id)}
              >
                <span className={cn("grid size-11 place-items-center rounded-sm", tileTone(unit.id))}>
                  <AppIcon name={unit.icon} className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2 font-semibold">
                    {unit.titleRu}
                    {done ? (
                      <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
                        <Check className="size-3" />
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-sm text-muted">{unit.title}</span>
                </span>
                <ChevronRight className={cn("size-4 text-faint transition-transform duration-150", open && "rotate-90")} />
              </button>
              {open ? (
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-sm text-ink">{unit.explanation}</p>
                  <p className="mt-2 rounded-md bg-primary-soft px-3 py-2 text-sm text-primary">{unit.example}</p>
                  <Button asChild size="lg" className="mt-3">
                    <Link to="/practice" search={{ kind: "grammar", id: unit.id }}>
                      Тренировка · {unit.questions.length} заданий
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Screen>
  );
}
