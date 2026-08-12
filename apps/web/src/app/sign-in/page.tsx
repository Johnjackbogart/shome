import { redirect } from "next/navigation";
import { SignInView } from "@/components/SignInView";
import { getSessionOrNull } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const session = await getSessionOrNull();
  if (session) redirect("/");

  return <SignInView />;
}
