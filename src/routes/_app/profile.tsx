import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { BookMarked, ChevronRight, Flame, Settings, Star, Trophy } from "lucide-react";
import { Screen } from "@/components/app-shell";
import { Progress } from "@/components/ui/progress";
import { LEVEL_XP, allWords, topics } from "@/lib/content";
import { levelFromXp, useProgress, xpIntoLevel } from "@/lib/store";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const name = useProgress((s) => s.name);
  const xp = useProgress((s) => s.xp);
  const stars = useProgress((s) => s.stars);
  const streak = useProgress((s) => s.streak);
  const completed = useProgress((s) => s.completed);
  const learnedIds = useProgress((s) => s.learnedIds);
  const level = levelFromXp(xp);
  const lessons = completed.filter((id) => !id.startsWith("game:")).length;

  return (
    <Screen>
      <header className="pt-6">
        <p className="text-sm font-medium text-primary">Профиль</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{name || "Ученик"}</h1>
      </header>
      <div className="mt-5 rounded-xl bg-surface p-5 shadow-border">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm text-muted">Уровень</div>
            <div className="text-3xl font-semibold tabular-nums">{level}</div>
          </div>
          <div className="text-right text-sm text-muted tabular-nums">
            {xpIntoLevel(xp)} / {LEVEL_XP} опыта
          </div>
        </div>
        <Progress className="mt-4" value={(xpIntoLevel(xp) / LEVEL_XP) * 100} />
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Stat icon={<Flame className="size-4" />} label="Серия" value={`${streak}`} />
          <Stat icon={<Star className="size-4" />} label="Звёзды" value={`${stars}`} />
          <Stat icon={<Trophy className="size-4" />} label="Уроки" value={`${lessons}`} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Row to="/dictionary" icon={<BookMarked className="size-5" />} title="Мой словарь" hint={`${learnedIds.length} / ${allWords.length} слов`} />
        <Row to="/lessons" icon={<Trophy className="size-5" />} title="Темы" hint={`${topics.filter((t) => completed.includes(`words:${t.id}`)).length} из ${topics.length}`} />
        <Row to="/settings" icon={<Settings className="size-5" />} title="Настройки" hint="Имя, цель, звук" />
      </div>
    </Screen>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface-2 px-2 py-3">
      <div className="flex items-center justify-center gap-1 text-primary">{icon}</div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

function Row({ to, icon, title, hint }: { to: "/dictionary" | "/settings" | "/lessons"; icon: ReactNode; title: string; hint: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-lg bg-surface px-4 py-3 shadow-border">
      <span className="grid size-10 place-items-center rounded-sm bg-primary-soft text-primary">{icon}</span>
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted">{hint}</span>
      </span>
      <ChevronRight className="size-4 text-faint" />
    </Link>
  );
}
