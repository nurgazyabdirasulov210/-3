import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { AppIcon } from "@/lib/icons";

export function ScreenHeader({
  title,
  backTo,
  icon,
}: {
  title: string;
  backTo?: string;
  icon?: string;
}) {
  const router = useRouter();
  return (
    <header className="flex items-center gap-2 py-4">
      {backTo ? (
        <button
          type="button"
          onClick={() => router.history.push(backTo)}
          className="grid size-11 place-items-center rounded-md text-ink transition-colors duration-150 hover:bg-primary-soft"
          aria-label="Назад"
        >
          <ChevronLeft className="size-6" />
        </button>
      ) : null}
      {icon ? (
        <span className="grid size-10 place-items-center rounded-sm bg-primary-soft text-primary">
          <AppIcon name={icon} className="size-5" />
        </span>
      ) : null}
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
    </header>
  );
}
