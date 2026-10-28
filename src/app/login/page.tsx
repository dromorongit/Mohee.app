import { getOptionalUser } from "@/server/require-user"
import { redirect } from "next/navigation"

import PageShell from "@/components/page-shell"
import LoginForm from "./login-form"

export default async function LoginPage() {
  const user = await getOptionalUser()
  if (user) {
    redirect("/home")
  }
  return (
    <PageShell>
      <LoginForm />
    </PageShell>
  );
}
