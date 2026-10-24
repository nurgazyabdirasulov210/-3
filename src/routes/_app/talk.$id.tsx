import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Volume2 } from "lucide-react";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { Button } from "@/components/ui/button";
import { getDialogue } from "@/lib/content";
import { speakEnglish } from "@/lib/speak";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/talk/$id")({
  component: DialoguePage,
});

function DialoguePage() {
  const { id } = Route.useParams();
  const dialogue = getDialogue(id);
  const speechRate = useProgress((s) => s.speechRate);
  const completeLesson = useProgress((s) => s.completeLesson);
  const completed = useProgress((s) => s.completed);
  const [showRu, setShowRu] = useState(true);
  const [active, setActive] = useState(0);

  if (!dialogue) {
    return (
      <Screen>
        <ScreenHeader title="Диалог не найден" backTo="/talk" />
      </Screen>
    );
  }

  const done = completed.includes(`talk:${dialogue.id}`);

  function playAll() {
    if (!dialogue) return;
    const text = dialogue.lines.map((line) => line.en).join(". ");
    speakEnglish(text, speechRate);
  }

  return (
    <Screen>
      <ScreenHeader title={dialogue.titleRu} backTo="/talk" icon={dialogue.icon} />
      <p className="text-sm text-muted">
        {dialogue.scene}. {dialogue.title}
      </p>
      <div className="mt-4 flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={playAll}>
          <Volume2 className="size-4" />
          Весь диалог
        </Button>
        <Button variant={showRu ? "soft" : "secondary"} onClick={() => setShowRu((value) => !value)}>
          RU
        </Button>
      </div>
      <div className="mt-4 rounded-xl bg-surface p-4 shadow-border">
        {dialogue.lines.map((line, index) => (
          <button
            key={`${line.en}-${index}`}
            type="button"
            onClick={() => {
              setActive(index);
              speakEnglish(line.en, speechRate);
            }}
            className={cn(
              "mb-2 max-w-[88%] rounded-lg px-3.5 py-3 text-left transition-colors duration-150 last:mb-0",
              line.speaker === "a" ? "bg-primary-soft text-ink" : "ml-auto bg-primary text-primary-fg",
              active === index && "ring-2 ring-primary/40",
            )}
          >
            <div className="text-[11px] font-medium opacity-70">{line.name}</div>
            <div className="font-medium">{line.en}</div>
            {showRu ? <div className="mt-1 text-sm opacity-80">{line.ru}</div> : null}
          </button>
        ))}
      </div>
      <Button
        className="mt-4"
        size="lg"
        variant={done ? "secondary" : "primary"}
        onClick={() => completeLesson(`talk:${dialogue.id}`)}
      >
        {done ? "Пройдено" : "Отметить как пройденный"}
      </Button>
    </Screen>
  );
}
