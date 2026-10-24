import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Layers, Shuffle, Timer, Trophy } from "lucide-react";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { Button } from "@/components/ui/button";
import { WordArt } from "@/components/word-art";
import { allWords, type Word } from "@/lib/content";
import { speakEnglish } from "@/lib/speak";
import { useProgress } from "@/lib/store";
import { cn, shuffle } from "@/lib/utils";

export const Route = createFileRoute("/_app/game")({
  component: GamePage,
});

type Mode = "hub" | "match" | "speed" | "scramble";

function GamePage() {
  const highScores = useProgress((s) => s.highScores);
  const [mode, setMode] = useState<Mode>("hub");

  if (mode === "match") return <MatchGame onExit={() => setMode("hub")} />;
  if (mode === "speed") return <SpeedGame onExit={() => setMode("hub")} />;
  if (mode === "scramble") return <ScrambleGame onExit={() => setMode("hub")} />;

  return (
    <Screen>
      <ScreenHeader title="Игра" icon="gamepad-2" />
      <p className="text-sm text-muted">Три мини-игры на слова, которые уже есть в курсе.</p>
      <div className="mt-4 space-y-3">
        <GameCard
          icon={<Layers className="size-5" />}
          title="Пары"
          hint="Найди английское и русский перевод"
          score={highScores.match}
          onClick={() => setMode("match")}
        />
        <GameCard
          icon={<Timer className="size-5" />}
          title="Скорость"
          hint="45 секунд на как можно больше ответов"
          score={highScores.speed}
          onClick={() => setMode("speed")}
        />
        <GameCard
          icon={<Shuffle className="size-5" />}
          title="Буквы"
          hint="Собери слово из перемешанных букв"
          score={highScores.scramble}
          onClick={() => setMode("scramble")}
        />
      </div>
    </Screen>
  );
}

function GameCard({
  icon,
  title,
  hint,
  score,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  hint: string;
  score: number;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-xl bg-surface p-4 text-left shadow-border">
      <span className="grid size-12 place-items-center rounded-md bg-primary-soft text-primary">{icon}</span>
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted">{hint}</span>
      </span>
      <span className="text-right text-sm text-muted">
        <Trophy className="mx-auto size-4 text-primary" />
        <span className="mt-1 block tabular-nums">{score}</span>
      </span>
    </button>
  );
}

type MatchCard = { key: string; pair: string; label: string; word: Word; side: "en" | "ru" };

function MatchGame({ onExit }: { onExit: () => void }) {
  const setHighScore = useProgress((s) => s.setHighScore);
  const awardQuiz = useProgress((s) => s.awardQuiz);
  const awarded = useRef(false);
  const deck = useMemo(() => {
    const words = shuffle(allWords).slice(0, 6);
    const cards: MatchCard[] = words.flatMap((word) => [
      { key: `${word.id}-en`, pair: word.id, label: word.en, word, side: "en" as const },
      { key: `${word.id}-ru`, pair: word.id, label: word.ru, word, side: "ru" as const },
    ]);
    return shuffle(cards);
  }, []);
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (matched.length === deck.length && deck.length > 0 && !awarded.current) {
      awarded.current = true;
      const score = Math.max(10, 120 - moves * 4);
      setHighScore("match", score);
      awardQuiz({ correct: 6, total: 6, lessonId: "game:match" });
    }
  }, [matched, deck.length, moves, setHighScore, awardQuiz]);

  function tap(card: MatchCard) {
    if (locked || matched.includes(card.key) || open.includes(card.key)) return;
    const next = [...open, card.key];
    setOpen(next);
    if (next.length < 2) return;
    setMoves((value) => value + 1);
    const [firstKey, secondKey] = next;
    const first = deck.find((item) => item.key === firstKey);
    const second = deck.find((item) => item.key === secondKey);
    if (first && second && first.pair === second.pair && first.key !== second.key) {
      setMatched((value) => [...value, first.key, second.key]);
      setOpen([]);
      return;
    }
    setLocked(true);
    window.setTimeout(() => {
      setOpen([]);
      setLocked(false);
    }, 700);
  }

  const finished = matched.length === deck.length && deck.length > 0;

  return (
    <Screen>
      <ScreenHeader title="Пары" />
      <p className="text-sm text-muted tabular-nums">Ходы: {moves}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {deck.map((card) => {
          const shown = open.includes(card.key) || matched.includes(card.key);
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => tap(card)}
              className={cn(
                "flex min-h-24 flex-col items-center justify-center rounded-lg px-1.5 text-center text-sm font-semibold shadow-border transition-colors duration-150",
                shown ? "bg-primary-soft text-ink" : "bg-primary text-primary-fg",
                matched.includes(card.key) && "bg-success-soft text-success",
              )}
            >
              {shown ? card.label : "?"}
            </button>
          );
        })}
      </div>
      {finished ? (
        <div className="mt-5 rounded-xl bg-surface p-5 text-center shadow-border">
          <Check className="mx-auto size-8 text-success" />
          <p className="mt-2 font-semibold">Все пары найдены</p>
          <Button className="mt-4" size="lg" onClick={onExit}>
            К играм
          </Button>
        </div>
      ) : (
        <Button className="mt-5" variant="secondary" size="lg" onClick={onExit}>
          Выйти
        </Button>
      )}
    </Screen>
  );
}

function SpeedGame({ onExit }: { onExit: () => void }) {
  const speechRate = useProgress((s) => s.speechRate);
  const setHighScore = useProgress((s) => s.setHighScore);
  const awardQuiz = useProgress((s) => s.awardQuiz);
  const awarded = useRef(false);
  const pack = useMemo(() => shuffle(allWords).slice(0, 24), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(45);
  const [done, setDone] = useState(false);
  const word = pack[index % pack.length];
  const options = useMemo(() => {
    if (!word) return [];
    const wrong = shuffle(allWords.filter((item) => item.id !== word.id)).slice(0, 3).map((item) => item.ru);
    return shuffle([word.ru, ...wrong]);
  }, [word]);

  useEffect(() => {
    if (done) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setDone(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [done]);

  useEffect(() => {
    if (done && !awarded.current) {
      awarded.current = true;
      setHighScore("speed", score);
      awardQuiz({ correct: Math.max(1, Math.floor(score / 10)), total: Math.max(1, Math.floor(score / 10)), lessonId: "game:speed" });
    }
  }, [done, score, setHighScore, awardQuiz]);

  useEffect(() => {
    if (word) speakEnglish(word.en, speechRate);
  }, [word, speechRate]);

  if (!word) return null;

  return (
    <Screen>
      <ScreenHeader title="Скорость" />
      <div className="flex items-center justify-between text-sm">
        <span className="tabular-nums font-semibold text-primary">{seconds} с</span>
        <span className="tabular-nums text-muted">Очки {score}</span>
      </div>
      {done ? (
        <div className="mt-6 rounded-xl bg-surface p-6 text-center shadow-border">
          <Trophy className="mx-auto size-8 text-primary" />
          <p className="mt-3 text-2xl font-semibold tabular-nums">{score}</p>
          <Button className="mt-4" size="lg" onClick={onExit}>
            К играм
          </Button>
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-surface p-5 shadow-border">
          <WordArt word={word} size="lg" className="mx-auto" />
          <div className="mt-3 text-center text-2xl font-semibold">{word.en}</div>
          <div className="mt-4 grid gap-2">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className="min-h-12 rounded-md bg-surface-2 px-4 text-left font-medium shadow-border"
                onClick={() => {
                  if (option === word.ru) setScore((value) => value + 10);
                  setIndex((value) => value + 1);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </Screen>
  );
}

function ScrambleGame({ onExit }: { onExit: () => void }) {
  const setHighScore = useProgress((s) => s.setHighScore);
  const awardQuiz = useProgress((s) => s.awardQuiz);
  const speechRate = useProgress((s) => s.speechRate);
  const pool = useMemo(
    () => shuffle(allWords.filter((word) => !word.en.includes(" ") && word.en.length >= 3 && word.en.length <= 8)),
    [],
  );
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const word = pool[index];
  const letters = useMemo(() => {
    if (!word) return [];
    return shuffle(word.en.toLowerCase().split("").map((ch, i) => ({ ch, i })));
  }, [word]);

  const guess = picked.map((i) => letters.find((item) => item.i === i)?.ch).join("");
  const complete = Boolean(word && guess.length === word.en.length);

  useEffect(() => {
    if (word) speakEnglish(word.en, speechRate);
  }, [word, speechRate]);

  if (!word) return null;

  function submit() {
    if (!word || !complete) return;
    const ok = guess === word.en.toLowerCase();
    if (ok) setScore((value) => value + 15);
    if (index + 1 >= 8) {
      const nextScore = score + (ok ? 15 : 0);
      setHighScore("scramble", nextScore);
      awardQuiz({ correct: Math.floor(nextScore / 15), total: 8, lessonId: "game:scramble" });
      onExit();
      return;
    }
    setIndex((value) => value + 1);
    setPicked([]);
  }

  return (
    <Screen>
      <ScreenHeader title="Буквы" />
      <p className="text-sm text-muted">
        {word.ru} · {index + 1}/8 · очки {score}
      </p>
      <div className="mt-4 rounded-xl bg-surface p-5 shadow-border">
        <WordArt word={word} size="md" className="mx-auto" />
        <div className="mt-4 min-h-12 rounded-md bg-surface-2 px-3 py-3 text-center text-2xl font-semibold tracking-widest">
          {guess || " "}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {letters.map((item) => {
            const used = picked.includes(item.i);
            return (
              <button
                key={item.i}
                type="button"
                disabled={used}
                onClick={() => setPicked((value) => [...value, item.i])}
                className="grid size-12 place-items-center rounded-md bg-primary text-lg font-semibold text-primary-fg disabled:opacity-30"
              >
                {item.ch}
              </button>
            );
          })}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => setPicked([])}>
            Сброс
          </Button>
          <Button onClick={submit} disabled={!complete}>
            Проверить
          </Button>
        </div>
      </div>
      <Button className="mt-4" variant="ghost" size="lg" onClick={onExit}>
        Выйти
      </Button>
    </Screen>
  );
}
