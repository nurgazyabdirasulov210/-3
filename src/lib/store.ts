import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LEVEL_XP, STARS_PER_CORRECT, XP_LESSON_BONUS, XP_PER_CORRECT } from "@/lib/content";
import { todayKey, yesterdayKey } from "@/lib/utils";

export type WordStat = {
  seen: number;
  correct: number;
  wrong: number;
};

type HighScores = {
  match: number;
  speed: number;
  scramble: number;
};

type ProgressState = {
  onboarded: boolean;
  name: string;
  xp: number;
  stars: number;
  streak: number;
  lastActiveDate: string;
  todayDate: string;
  todayXp: number;
  dailyGoal: number;
  learnedIds: string[];
  completed: string[];
  wordStats: Record<string, WordStat>;
  highScores: HighScores;
  speechRate: number;
  markOnboarded: (name: string, dailyGoal: number) => void;
  setName: (name: string) => void;
  setDailyGoal: (dailyGoal: number) => void;
  setSpeechRate: (speechRate: number) => void;
  touchStreak: () => void;
  awardQuiz: (input: {
    correct: number;
    total: number;
    lessonId?: string;
    wordIds?: string[];
    results?: { id: string; ok: boolean }[];
  }) => { xp: number; stars: number; perfect: boolean };
  completeLesson: (lessonId: string, bonus?: number) => void;
  setHighScore: (game: keyof HighScores, score: number) => void;
  resetProgress: () => void;
};

const emptyHighScores: HighScores = { match: 0, speed: 0, scramble: 0 };

function uniquePush(list: string[], id: string) {
  return list.includes(id) ? list : [...list, id];
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      onboarded: false,
      name: "",
      xp: 0,
      stars: 0,
      streak: 0,
      lastActiveDate: "",
      todayDate: "",
      todayXp: 0,
      dailyGoal: 50,
      learnedIds: [],
      completed: [],
      wordStats: {},
      highScores: emptyHighScores,
      speechRate: 0.92,
      markOnboarded: (name, dailyGoal) =>
        set({
          onboarded: true,
          name: name.trim() || "Друг",
          dailyGoal,
        }),
      setName: (name) => set({ name: name.trim() || "Друг" }),
      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
      setSpeechRate: (speechRate) => set({ speechRate }),
      touchStreak: () => {
        const today = todayKey();
        const state = get();
        const todayXp = state.todayDate === today ? state.todayXp : 0;
        if (state.lastActiveDate === today) {
          if (state.todayDate !== today) set({ todayDate: today, todayXp });
          return;
        }
        const streak = state.lastActiveDate === yesterdayKey() ? state.streak + 1 : 1;
        set({ lastActiveDate: today, streak, todayDate: today, todayXp });
      },
      awardQuiz: ({ correct, total, lessonId, wordIds = [], results = [] }) => {
        const today = todayKey();
        const state = get();
        const perfect = total > 0 && correct === total;
        const xp = correct * XP_PER_CORRECT + (perfect ? XP_LESSON_BONUS : 0);
        const stars = correct * STARS_PER_CORRECT + (perfect ? 8 : 0);
        const stats = { ...state.wordStats };
        for (const result of results) {
          const prev = stats[result.id] ?? { seen: 0, correct: 0, wrong: 0 };
          stats[result.id] = {
            seen: prev.seen + 1,
            correct: prev.correct + (result.ok ? 1 : 0),
            wrong: prev.wrong + (result.ok ? 0 : 1),
          };
        }
        let learnedIds = [...state.learnedIds];
        for (const id of wordIds) learnedIds = uniquePush(learnedIds, id);
        let completed = [...state.completed];
        if (lessonId && (perfect || correct / Math.max(total, 1) >= 0.7)) {
          completed = uniquePush(completed, lessonId);
        }
        const todayXp = (state.todayDate === today ? state.todayXp : 0) + xp;
        const streak =
          state.lastActiveDate === today
            ? state.streak
            : state.lastActiveDate === yesterdayKey()
              ? state.streak + 1
              : 1;
        set({
          xp: state.xp + xp,
          stars: state.stars + stars,
          learnedIds,
          completed,
          wordStats: stats,
          todayDate: today,
          todayXp,
          lastActiveDate: today,
          streak,
        });
        return { xp, stars, perfect };
      },
      completeLesson: (lessonId, bonus = 15) => {
        const today = todayKey();
        const state = get();
        if (state.completed.includes(lessonId)) return;
        const todayXp = (state.todayDate === today ? state.todayXp : 0) + bonus;
        const streak =
          state.lastActiveDate === today
            ? state.streak
            : state.lastActiveDate === yesterdayKey()
              ? state.streak + 1
              : 1;
        set({
          completed: uniquePush(state.completed, lessonId),
          xp: state.xp + bonus,
          stars: state.stars + 4,
          todayDate: today,
          todayXp,
          lastActiveDate: today,
          streak,
        });
      },
      setHighScore: (game, score) => {
        const highScores = { ...get().highScores };
        if (score > highScores[game]) {
          highScores[game] = score;
          set({ highScores });
        }
      },
      resetProgress: () =>
        set({
          xp: 0,
          stars: 0,
          streak: 0,
          lastActiveDate: "",
          todayDate: "",
          todayXp: 0,
          learnedIds: [],
          completed: [],
          wordStats: {},
          highScores: emptyHighScores,
        }),
    }),
    { name: "english-start-progress" },
  ),
);

export function levelFromXp(xp: number) {
  return Math.floor(xp / LEVEL_XP) + 1;
}

export function xpIntoLevel(xp: number) {
  return xp % LEVEL_XP;
}
