import { allWords, getGrammar, getListenSet, getTopic, topics, type Word } from "@/lib/content";
import { shuffle } from "@/lib/utils";

export type Question = {
  id: string;
  wordId?: string;
  kind: "choice" | "listen";
  title: string;
  prompt: string;
  promptRu?: string;
  audio?: string;
  emoji?: string;
  icon?: string;
  options: string[];
  answer: string;
};

function distractors(word: Word, pool: Word[], field: "en" | "ru", n = 3) {
  const other = shuffle(pool.filter((item) => item.id !== word.id)).slice(0, n);
  while (other.length < n) {
    const extra = allWords.find((item) => !other.includes(item) && item.id !== word.id);
    if (!extra) break;
    other.push(extra);
  }
  return other.map((item) => item[field]);
}

export function wordQuestions(topicId: string, count = 8): Question[] {
  const topic = getTopic(topicId);
  const pool = topic?.words ?? allWords;
  const selected = shuffle(pool).slice(0, Math.min(count, pool.length));
  return selected.map((word, index) => {
    const mode = index % 3;
    if (mode === 0) {
      return {
        id: `${word.id}-en-ru`,
        wordId: word.id,
        kind: "choice",
        title: "Выбери перевод",
        prompt: word.en,
        promptRu: word.ipa,
        emoji: word.emoji,
        icon: word.icon,
        options: shuffle([word.ru, ...distractors(word, pool, "ru")]),
        answer: word.ru,
      };
    }
    if (mode === 1) {
      return {
        id: `${word.id}-ru-en`,
        wordId: word.id,
        kind: "choice",
        title: "Как это по-английски?",
        prompt: word.ru,
        emoji: word.emoji,
        icon: word.icon,
        options: shuffle([word.en, ...distractors(word, pool, "en")]),
        answer: word.en,
      };
    }
    return {
      id: `${word.id}-listen`,
      wordId: word.id,
      kind: "listen",
      title: "Что ты слышишь?",
      prompt: "Нажми динамик и выбери слово",
      audio: word.en,
      emoji: word.emoji,
      icon: word.icon,
      options: shuffle([word.en, ...distractors(word, pool, "en")]),
      answer: word.en,
    };
  });
}

export function dailyQuestions(): Question[] {
  const picks = shuffle(topics).slice(0, 5).flatMap((topic) => shuffle(topic.words).slice(0, 2));
  const unique = picks.filter((word, index, arr) => arr.findIndex((item) => item.id === word.id) === index);
  return wordQuestionsFromWords(unique.slice(0, 8));
}

function wordQuestionsFromWords(words: Word[]): Question[] {
  return words.map((word, index) => {
    const mode = index % 2;
    if (mode === 0) {
      return {
        id: `${word.id}-daily-ru`,
        wordId: word.id,
        kind: "choice" as const,
        title: "Выбери перевод",
        prompt: word.en,
        promptRu: word.ipa,
        emoji: word.emoji,
        icon: word.icon,
        options: shuffle([word.ru, ...distractors(word, allWords, "ru")]),
        answer: word.ru,
      };
    }
    return {
      id: `${word.id}-daily-listen`,
      wordId: word.id,
      kind: "listen" as const,
      title: "Что ты слышишь?",
      prompt: "Слушай и выбери перевод",
      audio: word.en,
      emoji: word.emoji,
      icon: word.icon,
      options: shuffle([word.ru, ...distractors(word, allWords, "ru")]),
      answer: word.ru,
    };
  });
}

export function listenQuestions(setId: string): Question[] {
  const set = getListenSet(setId);
  if (!set) return [];
  return set.items.map((item, index) => ({
    id: `${set.id}-${index}`,
    kind: "listen" as const,
    title: "Выбери правильный перевод",
    prompt: "Прослушай фразу",
    audio: item.en,
    options: shuffle(item.options),
    answer: item.answer,
  }));
}

export function grammarQuestions(unitId: string): Question[] {
  const unit = getGrammar(unitId);
  if (!unit) return [];
  return unit.questions.map((item, index) => ({
    id: `${unit.id}-${index}`,
    kind: "choice" as const,
    title: item.hint,
    prompt: item.prompt,
    options: shuffle(item.options),
    answer: item.answer,
  }));
}
