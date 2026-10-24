import { useMemo } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Screen } from "@/components/app-shell";
import { ScreenHeader } from "@/components/screen-header";
import { QuizEngine } from "@/components/quiz-engine";
import { getGrammar, getListenSet, getTopic } from "@/lib/content";
import { dailyQuestions, grammarQuestions, listenQuestions, wordQuestions } from "@/lib/quiz";

type Search = {
  kind?: "words" | "listen" | "grammar" | "daily";
  id?: string;
};

export const Route = createFileRoute("/_app/practice")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    kind:
      search.kind === "listen" || search.kind === "grammar" || search.kind === "daily" || search.kind === "words"
        ? search.kind
        : "words",
    id: typeof search.id === "string" ? search.id : "greetings",
  }),
  component: PracticePage,
});

function PracticePage() {
  const { kind, id } = Route.useSearch();
  const router = useRouter();
  const pack = useMemo(() => {
    if (kind === "daily") {
      return { title: "Сегодня", questions: dailyQuestions(), lessonId: "daily", backTo: "/" };
    }
    if (kind === "listen") {
      const set = getListenSet(id ?? "");
      return {
        title: set?.titleRu ?? "Слушай",
        questions: listenQuestions(id ?? ""),
        lessonId: `listen:${id}`,
        backTo: "/listen",
      };
    }
    if (kind === "grammar") {
      const unit = getGrammar(id ?? "");
      return {
        title: unit?.titleRu ?? "Задание",
        questions: grammarQuestions(id ?? ""),
        lessonId: `grammar:${id}`,
        backTo: "/tasks",
      };
    }
    const topic = getTopic(id ?? "greetings");
    return {
      title: topic?.titleRu ?? "Тренировка",
      questions: wordQuestions(id ?? "greetings"),
      lessonId: `words:${id}`,
      backTo: id ? `/lessons/${id}` : "/lessons",
    };
  }, [kind, id]);

  return (
    <Screen>
      <ScreenHeader title={pack.title} backTo={pack.backTo} />
      <QuizEngine questions={pack.questions} lessonId={pack.lessonId} onExit={() => router.history.push(pack.backTo)} />
    </Screen>
  );
}
