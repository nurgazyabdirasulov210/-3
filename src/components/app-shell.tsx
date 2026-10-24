import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Gamepad2, Home, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/lessons", label: "Уроки", icon: BookOpen },
  { to: "/game", label: "Игра", icon: Gamepad2 },
  { to: "/profile", label: "Профиль", icon: UserRound },
] as const;

function isTabActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  if (to === "/lessons") {
    return (
      pathname.startsWith("/lessons") ||
      pathname.startsWith("/talk") ||
      pathname.startsWith("/listen") ||
      pathname.startsWith("/tasks") ||
      pathname.startsWith("/practice")
    );
  }
  if (to === "/game") return pathname.startsWith("/game");
  if (to === "/profile") {
    return pathname.startsWith("/profile") || pathname.startsWith("/dictionary") || pathname.startsWith("/settings");
  }
  return pathname === to;
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-dvh justify-center bg-bg">
      <div className="relative min-h-dvh w-full max-w-md bg-surface-2 pb-24 shadow-border">
        {children}
        <nav className="fixed bottom-0 left-1/2 z-20 flex h-[4.5rem] w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]">
          {tabs.map((tab) => {
            const active = isTabActive(pathname, tab.to);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={cn(
                  "flex min-h-11 min-w-16 flex-col items-center justify-center gap-1 rounded-sm text-[11px] font-medium text-faint transition-colors duration-150",
                  active && "text-primary",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function Screen({ children }: { children: ReactNode }) {
  return <div className="px-5 pb-6">{children}</div>;
}
