import { getOptionalUser } from "@/server/require-user"
import { redirect } from "next/navigation"
import LoginForm from "./login-form"

export default async function LoginPage() {
  const user = await getOptionalUser()
  if (user) {
    redirect("/home")
  }
  return <LoginForm />
}
