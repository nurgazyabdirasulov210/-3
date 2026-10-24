import { useEffect, useState } from "react";
import { Check, ChevronRight, RotateCcw, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WordArt } from "@/components/word-art";
import type { Question } from "@/lib/quiz";
import { speakEnglish } from "@/lib/speak";
import { useProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

type Result = { id: string; ok: boolean; wordId?: string };

export function QuizEngine({
  questions,
  lessonId,
  onExit,
}: {
  questions: Question[];
  lessonId?: string;
  onExit: () => void;
}) {
  const speechRate = useProgress((s) => s.speechRate);
  const awardQuiz = useProgress((s) => s.awardQuiz);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [summary, setSummary] = useState<{ xp: number; stars: number; perfect: boolean } | null>(null);

  const question = questions[index];
  const done = Boolean(summary) || questions.length === 0;

  useEffect(() => {
    if (!question || picked) return;
    if (question.kind === "listen" && question.audio) speakEnglish(question.audio, speechRate);
  }, [question, picked, speechRate]);

  if (!question && !done) {
    return (
      <div className="rounded-xl bg-surface p-6 shadow-border">
        <p className="text-muted">Нет вопросов для этой тренировки.</p>
        <Button className="mt-4" onClick={onExit}>
          Назад
        </Button>
      </div>
    );
  }

  if (done && summary) {
    const correct = results.filter((item) => item.ok).length;
    return (
      <div className="rounded-xl bg-surface p-6 text-center shadow-border">
        <div className="mx-auto grid size-16 place-items-center rounded-lg bg-success-soft text-success">
          <Check className="size-8" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          {summary.perfect ? "Идеально" : "Хорошая работа"}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {correct} из {results.length} верно
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-surface-2 px-3 py-4">
            <div className="text-xs font-medium text-muted">Опыт</div>
            <div className="mt-1 text-xl font-semibold tabular-nums">+{summary.xp}</div>
          </div>
          <div className="rounded-lg bg-surface-2 px-3 py-4">
            <div className="text-xs font-medium text-muted">Звёзды</div>
            <div className="mt-1 text-xl font-semibold tabular-nums">+{summary.stars}</div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <Button
            size="lg"
            onClick={() => {
              setIndex(0);
              setPicked(null);
              setResults([]);
              setSummary(null);
            }}
          >
            <RotateCcw className="size-4" />
            Ещё раз
          </Button>
          <Button size="lg" variant="secondary" onClick={onExit}>
            Дальше
          </Button>
        </div>
      </div>
    );
  }

  if (!question) return null;
  const isCorrect = picked === question.answer;

  function choose(option: string) {
    if (picked || !question) return;
    const ok = option === question.answer;
    setPicked(option);
    setResults((current) => [...current, { id: question.id, ok, wordId: question.wordId }]);
  }

  function next() {
    if (!picked || !question) return;
    if (index + 1 >= questions.length) {
      const all = [...results];
      const correct = all.filter((item) => item.ok).length;
      const award = awardQuiz({
        correct,
        total: all.length,
        lessonId,
        wordIds: all.map((item) => item.wordId).filter((id): id is string => Boolean(id)),
        results: all.map((item) => ({ id: item.wordId ?? item.id, ok: item.ok })),
      });
      setSummary(award);
      return;
    }
    setIndex((value) => value + 1);
    setPicked(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <span className="tabular-nums">
          {index + 1} / {questions.length}
        </span>
        <span>{question.title}</span>
      </div>
      <Progress value={((index + (picked ? 1 : 0)) / questions.length) * 100} />
      <div className="rounded-xl bg-surface p-5 shadow-border">
        {question.emoji && question.icon ? (
          <WordArt word={{ id: question.wordId ?? question.id, icon: question.icon, emoji: question.emoji, en: question.prompt }} size="lg" className="mx-auto" />
        ) : null}
        {question.kind === "listen" && question.audio ? (
          <button
            type="button"
            className="mx-auto mt-4 flex size-16 items-center justify-center rounded-lg bg-primary-soft text-primary transition-transform duration-150 active:scale-[0.96]"
            onClick={() => speakEnglish(question.audio!, speechRate)}
            aria-label="Прослушать"
          >
            <Volume2 className="size-7" />
          </button>
        ) : null}
        <div className="mt-4 text-center">
          <div className="text-2xl font-semibold tracking-tight">{question.prompt}</div>
          {question.promptRu ? <div className="mt-1 text-sm text-muted">{question.promptRu}</div> : null}
        </div>
        <div className="mt-5 grid gap-2">
          {question.options.map((option) => {
            const chosen = picked === option;
            const isAnswer = option === question.answer;
            return (
              <button
                key={option}
                type="button"
                disabled={Boolean(picked)}
                onClick={() => choose(option)}
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-md px-4 text-left text-base font-medium shadow-border transition-[background-color,box-shadow] duration-150",
                  !picked && "bg-surface hover:shadow-border-hover",
                  picked && isAnswer && "bg-success-soft text-success shadow-none",
                  picked && chosen && !isAnswer && "bg-danger-soft text-danger shadow-none",
                  picked && !chosen && !isAnswer && "opacity-60",
                )}
              >
                <span>{option}</span>
                {picked && isAnswer ? <Check className="size-4" /> : null}
                {picked && chosen && !isAnswer ? <X className="size-4" /> : null}
              </button>
            );
          })}
        </div>
        {picked ? (
          <div className="mt-4">
            <p className={cn("mb-3 text-sm font-medium", isCorrect ? "text-success" : "text-danger")}>
              {isCorrect ? "Верно" : `Правильный ответ: ${question.answer}`}
            </p>
            <Button size="lg" onClick={next}>
              {index + 1 >= questions.length ? "Результат" : "Дальше"}
              <ChevronRight className="size-4" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
