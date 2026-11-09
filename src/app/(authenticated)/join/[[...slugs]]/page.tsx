import { AuthPage as AuthPageComponent } from "@/components/auth/";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const resolvedParams = await params;
  const slugs = resolvedParams?.slugs;
  const inviteCode = slugs?.[0] ?? null;
  return <AuthPageComponent inviteCode={inviteCode} />;
}
