import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { AppIcon } from "@/lib/icons";
import { dialogues } from "@/lib/content";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/utils";
import { tileTone } from "@/components/word-art";

export const Route = createFileRoute("/_app/talk/")({
  component: TalkPage,
});

function TalkPage() {
  const completed = useProgress((s) => s.completed);
  return (
    <Screen>
      <ScreenHeader title="Разговор" icon="message-circle" />
      <p className="text-sm text-muted">Короткие диалоги. Слушай реплики и повторяй вслух.</p>
      <div className="mt-4 space-y-2">
        {dialogues.map((item) => {
          const done = completed.includes(`talk:${item.id}`);
          return (
            <Link
              key={item.id}
              to="/talk/$id"
              params={{ id: item.id }}
              className="flex items-center gap-3 rounded-lg bg-surface p-3 shadow-border"
            >
              <span className={cn("grid size-12 place-items-center rounded-sm", tileTone(item.id))}>
                <AppIcon name={item.icon} className="size-5" />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2 font-semibold">
                  {item.titleRu}
                  {done ? (
                    <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
                      <Check className="size-3" />
                    </span>
                  ) : null}
                </span>
                <span className="block text-sm text-muted">
                  {item.title} · {item.lines.length} фраз
                </span>
              </span>
              <ChevronRight className="size-4 text-faint" />
            </Link>
          );
        })}
      </div>
    </Screen>
  );
}
