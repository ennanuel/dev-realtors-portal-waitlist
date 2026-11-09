"use client";

import { useSession } from "@/auth/SessionContext";
import { redirect, usePathname } from "next/navigation";
import LoadingState from "@/components/ui/LoadingState";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { realtor, token, restoring } = useSession();
  const isInAuthPage = pathname.toLowerCase().startsWith("/join");

  if (restoring) return <LoadingState />;
  if (!isInAuthPage && !realtor && !token && !restoring) {
    redirect("/join");
  }
  return <>{children}</>;
}
