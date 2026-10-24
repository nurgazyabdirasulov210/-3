import { AppIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Word } from "@/lib/content";

const tones = ["bg-primary-soft text-primary", "bg-teal-soft text-teal", "bg-navy-soft text-navy", "bg-sky-soft text-sky"] as const;

export function tileTone(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash + seed.charCodeAt(i) * (i + 1)) % tones.length;
  return tones[hash] ?? tones[0];
}

export function WordArt({
  word,
  size = "md",
  className,
}: {
  word: Pick<Word, "id" | "icon" | "emoji" | "en">;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = size === "lg" ? "size-28 text-6xl rounded-xl" : size === "sm" ? "size-12 text-2xl rounded-sm" : "size-14 text-3xl rounded-md";
  return (
    <div className={cn("relative grid place-items-center", tileTone(word.id), box, className)}>
      <AppIcon name={word.icon} className={size === "lg" ? "size-12" : size === "sm" ? "size-5" : "size-6"} />
      <span className={cn("absolute leading-none", size === "lg" ? "right-2 top-2 text-xl" : "right-1 top-1 text-sm")}>
        {word.emoji}
      </span>
    </div>
  );
}
