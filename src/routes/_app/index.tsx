import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Flame,
  Gamepad2,
  Headphones,
  MessageCircle,
  Pencil,
  Settings,
  Sparkles,
} from "lucide-react";
import { Screen } from "@/components/app-shell";
import { Progress } from "@/components/ui/progress";
import { LEVEL_XP, dialogues, grammarUnits, listenSets, topics } from "@/lib/content";
import { levelFromXp, useProgress, xpIntoLevel } from "@/lib/store";
import { cn, greetingForHour } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

function HomePage() {
  const name = useProgress((s) => s.name);
  const streak = useProgress((s) => s.streak);
  const todayXp = useProgress((s) => s.todayXp);
  const dailyGoal = useProgress((s) => s.dailyGoal);
  const xp = useProgress((s) => s.xp);
  const completed = useProgress((s) => s.completed);
  const hour = new Date().getHours();
  const greeting = greetingForHour(hour);
  const dailyPct = Math.min(100, (todayXp / Math.max(dailyGoal, 1)) * 100);
  const nextTopic = topics.find((topic) => !completed.includes(`words:${topic.id}`)) ?? topics[0];
  const level = levelFromXp(xp);

  const modules = [
    { to: "/lessons", label: "Слова", hint: "Новые слова", icon: BookOpen, tone: "bg-primary-soft text-primary" },
    { to: "/talk", label: "Разговор", hint: "Фразы для общения", icon: MessageCircle, tone: "bg-teal-soft text-teal" },
    { to: "/listen", label: "Слушай", hint: "Понимай речь", icon: Headphones, tone: "bg-navy-soft text-navy" },
    { to: "/tasks", label: "Задания", hint: "Грамматика", icon: Pencil, tone: "bg-sky-soft text-sky" },
  ] as const;

  return (
    <Screen>
      <header className="flex items-center justify-between pt-5">
        <div>
          <div className="text-sm font-medium text-primary">English Start</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {greeting}
            {name ? `, ${name}` : ""}
          </h1>
        </div>
        <Link
          to="/settings"
          className="grid size-11 place-items-center rounded-md text-ink transition-colors duration-150 hover:bg-primary-soft"
          aria-label="Настройки"
        >
          <Settings className="size-5" />
        </Link>
      </header>
      <p className="mt-1 text-sm text-muted">Сегодня хороший день, чтобы стать увереннее в английском.</p>

      <div className="mt-5 rounded-xl bg-surface p-4 shadow-border">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-ink">
              <span className="grid size-8 place-items-center rounded-sm bg-primary-soft text-primary">
                <Flame className="size-4" />
              </span>
              <b className="text-lg font-semibold tabular-nums">{streak} дн.</b>
            </div>
            <p className="mt-2 text-sm text-muted">Серия занятий. Не прерывай ритм.</p>
          </div>
          <div className="text-right text-sm">
            <div className="font-medium">Уровень {level}</div>
            <div className="text-muted tabular-nums">
              {xpIntoLevel(xp)} / {LEVEL_XP}
            </div>
          </div>
        </div>
        <Progress className="mt-4" value={dailyPct} />
        <p className="mt-2 text-xs text-muted tabular-nums">
          Цель дня: {todayXp} / {dailyGoal} опыта
        </p>
      </div>

      {nextTopic ? (
        <Link
          to="/practice"
          search={{ kind: "words", id: nextTopic.id }}
          className="mt-4 flex items-center gap-3 rounded-xl bg-primary px-4 py-4 text-primary-fg shadow-border transition-transform duration-150 active:scale-[0.96]"
        >
          <span className="grid size-11 place-items-center rounded-md bg-primary-fg/15">
            <Sparkles className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block text-sm opacity-80">Продолжить</span>
            <span className="block font-semibold">{nextTopic.titleRu}</span>
          </span>
          <ChevronRight className="size-5" />
        </Link>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3">
        {modules.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="min-h-32 rounded-xl bg-surface p-4 text-left shadow-border transition-shadow duration-150 hover:shadow-border-hover"
            >
              <span className={cn("grid size-10 place-items-center rounded-sm", item.tone)}>
                <Icon className="size-5" />
              </span>
              <span className="mt-4 block font-semibold">{item.label}</span>
              <span className="mt-1 block text-sm text-muted">{item.hint}</span>
            </Link>
          );
        })}
        <Link
          to="/game"
          className="col-span-2 flex items-center gap-4 rounded-xl bg-surface p-4 shadow-border transition-shadow duration-150 hover:shadow-border-hover"
        >
          <span className="grid size-12 place-items-center rounded-md bg-primary-soft text-primary">
            <Gamepad2 className="size-6" />
          </span>
          <span className="flex-1">
            <span className="block font-semibold">Игра</span>
            <span className="block text-sm text-muted">Пары, скорость и буквы</span>
          </span>
          <ChevronRight className="size-5 text-faint" />
        </Link>
      </div>

      <section className="mt-6">
        <h2 className="text-sm font-semibold text-muted">Карта курса</h2>
        <div className="mt-3 space-y-2">
          <CourseRow
            label="Слова"
            value={`${topics.filter((t) => completed.includes(`words:${t.id}`)).length}/${topics.length}`}
          />
          <CourseRow
            label="Диалоги"
            value={`${dialogues.filter((t) => completed.includes(`talk:${t.id}`)).length}/${dialogues.length}`}
          />
          <CourseRow
            label="Аудирование"
            value={`${listenSets.filter((t) => completed.includes(`listen:${t.id}`)).length}/${listenSets.length}`}
          />
          <CourseRow
            label="Грамматика"
            value={`${grammarUnits.filter((t) => completed.includes(`grammar:${t.id}`)).length}/${grammarUnits.length}`}
          />
        </div>
      </section>
    </Screen>
  );
}

function CourseRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-surface px-4 py-3 shadow-border">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm tabular-nums text-muted">{value}</span>
    </div>
  );
}
