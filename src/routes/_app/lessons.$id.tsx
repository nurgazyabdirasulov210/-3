import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers3, Volume2 } from "lucide-react";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { Button } from "@/components/ui/button";
import { WordArt } from "@/components/word-art";
import { getTopic } from "@/lib/content";
import { speakEnglish } from "@/lib/speak";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/lessons/$id")({
  component: TopicPage,
});

function TopicPage() {
  const { id } = Route.useParams();
  const topic = getTopic(id);
  const speechRate = useProgress((s) => s.speechRate);
  const learnedIds = useProgress((s) => s.learnedIds);
  const [mode, setMode] = useState<"list" | "cards">("list");
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!topic) {
    return (
      <Screen>
        <ScreenHeader title="Тема не найдена" backTo="/lessons" />
      </Screen>
    );
  }

  const word = topic.words[card];

  return (
    <Screen>
      <ScreenHeader title={topic.titleRu} backTo="/lessons" icon={topic.icon} />
      <p className="text-sm text-muted">
        {topic.blurb}. {topic.words.length} слов.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode("list")}
          className={cn(
            "h-11 rounded-md text-sm font-semibold",
            mode === "list" ? "bg-primary text-primary-fg" : "bg-surface text-ink shadow-border",
          )}
        >
          Список
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("cards");
            setFlipped(false);
          }}
          className={cn(
            "h-11 rounded-md text-sm font-semibold",
            mode === "cards" ? "bg-primary text-primary-fg" : "bg-surface text-ink shadow-border",
          )}
        >
          Карточки
        </button>
      </div>

      {mode === "list" ? (
        <div className="mt-4 space-y-2">
          {topic.words.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-lg bg-surface p-3 shadow-border">
              <WordArt word={item} size="sm" />
              <div className="min-w-0 flex-1">
                <b className="block font-semibold">{item.en}</b>
                <small className="text-muted">
                  [{item.ipa}] · {item.ru}
                  {learnedIds.includes(item.id) ? " · в словаре" : ""}
                </small>
              </div>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full bg-primary-soft text-primary"
                onClick={() => speakEnglish(item.en, speechRate)}
                aria-label={`Произнести ${item.en}`}
              >
                <Volume2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : word ? (
        <div className="mt-5">
          <button
            type="button"
            className="flip-scene block w-full"
            onClick={() => {
              setFlipped((value) => !value);
              if (!flipped) speakEnglish(word.en, speechRate);
            }}
          >
            <div className={cn("flip-inner h-64", flipped && "is-flipped")}>
              <div className="flip-face flex h-64 flex-col items-center justify-center rounded-xl bg-surface p-6 shadow-border">
                <WordArt word={word} size="lg" />
                <div className="mt-4 text-3xl font-semibold tracking-tight">{word.en}</div>
                <div className="mt-1 text-sm text-muted">[{word.ipa}]</div>
                <p className="mt-4 text-sm text-faint">Нажми, чтобы увидеть перевод</p>
              </div>
              <div className="flip-back flex h-64 flex-col items-center justify-center rounded-xl bg-primary p-6 text-primary-fg">
                <div className="text-3xl font-semibold">{word.ru}</div>
                <p className="mt-4 text-sm opacity-90">{word.example}</p>
                <p className="mt-1 text-sm opacity-70">{word.exampleRu}</p>
              </div>
            </div>
          </button>
          <div className="mt-4 flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              disabled={card === 0}
              onClick={() => {
                setCard((value) => Math.max(0, value - 1));
                setFlipped(false);
              }}
            >
              Назад
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              disabled={card >= topic.words.length - 1}
              onClick={() => {
                setCard((value) => Math.min(topic.words.length - 1, value + 1));
                setFlipped(false);
              }}
            >
              Дальше
            </Button>
          </div>
          <p className="mt-2 text-center text-sm text-muted tabular-nums">
            {card + 1} / {topic.words.length}
          </p>
        </div>
      ) : null}

      <Button asChild size="lg" className="mt-5">
        <Link to="/practice" search={{ kind: "words", id: topic.id }}>
          <Layers3 className="size-4" />
          Начать тренировку
        </Link>
      </Button>
    </Screen>
  );
}
