import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { AppIcon } from "@/lib/icons";
import { topics } from "@/lib/content";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/utils";
import { tileTone } from "@/components/word-art";

export const Route = createFileRoute("/_app/lessons/")({
  component: LessonsPage,
});

function LessonsPage() {
  const completed = useProgress((s) => s.completed);
  const learnedIds = useProgress((s) => s.learnedIds);

  return (
    <Screen>
      <ScreenHeader title="Слова" icon="book-open" />
      <p className="text-sm text-muted">12 тем уровня A1. Слушай, повторяй, затем тренируй перевод.</p>
      <div className="mt-4 space-y-2">
        {topics.map((topic, index) => {
          const done = completed.includes(`words:${topic.id}`);
          const known = topic.words.filter((word) => learnedIds.includes(word.id)).length;
          return (
            <Link
              key={topic.id}
              to="/lessons/$id"
              params={{ id: topic.id }}
              className="flex items-center gap-3 rounded-lg bg-surface p-3 shadow-border transition-shadow duration-150 hover:shadow-border-hover"
            >
              <span className={cn("grid size-12 place-items-center rounded-sm", tileTone(topic.id))}>
                <AppIcon name={topic.icon} className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-semibold">{index + 1}. {topic.titleRu}</span>
                  {done ? (
                    <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
                      <Check className="size-3" />
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block truncate text-sm text-muted">
                  {topic.title} · {known}/{topic.words.length} слов
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </Screen>
  );
}
