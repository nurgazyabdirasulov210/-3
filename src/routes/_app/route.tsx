import { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Onboarding } from "@/components/onboarding";
import { useProgress } from "@/lib/store";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const onboarded = useProgress((s) => s.onboarded);

  useEffect(() => {
    useProgress.getState().touchStreak();
  }, []);

  if (!onboarded) return <Onboarding />;

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
