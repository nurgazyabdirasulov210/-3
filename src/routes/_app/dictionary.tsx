import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Volume2 } from "lucide-react";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { WordArt } from "@/components/word-art";
import { allWords } from "@/lib/content";
import { speakEnglish } from "@/lib/speak";
import { useProgress } from "@/lib/store";

export const Route = createFileRoute("/_app/dictionary")({
  component: DictionaryPage,
});

function DictionaryPage() {
  const learnedIds = useProgress((s) => s.learnedIds);
  const speechRate = useProgress((s) => s.speechRate);
  const [query, setQuery] = useState("");
  const words = useMemo(() => {
    const q = query.trim().toLowerCase();
    const learned = allWords.filter((word) => learnedIds.includes(word.id));
    if (!q) return learned;
    return learned.filter(
      (word) => word.en.toLowerCase().includes(q) || word.ru.toLowerCase().includes(q),
    );
  }, [learnedIds, query]);

  return (
    <Screen>
      <ScreenHeader title="Словарь" backTo="/profile" icon="book-open" />
      <label className="relative mt-1 block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти слово"
          className="h-12 w-full rounded-md bg-surface pl-10 pr-4 text-sm shadow-border outline-none focus:ring-2 focus:ring-primary/40"
        />
      </label>
      {words.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          Слова появятся здесь после тренировок. Пройди тему «Приветствия», чтобы открыть первые карточки.
        </p>
      ) : (
        <div className="mt-4 space-y-2">
          {words.map((word) => (
            <div key={word.id} className="flex items-center gap-3 rounded-lg bg-surface p-3 shadow-border">
              <WordArt word={word} size="sm" />
              <div className="flex-1">
                <b className="block">{word.en}</b>
                <small className="text-muted">
                  [{word.ipa}] · {word.ru}
                </small>
              </div>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full bg-primary-soft text-primary"
                onClick={() => speakEnglish(word.en, speechRate)}
                aria-label={`Произнести ${word.en}`}
              >
                <Volume2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Screen>
  );
}
