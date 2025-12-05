import { Button } from "@heroui/react";
import { logIn } from "@/lib/actions/auth.action";

export function LogInButton() {
  return (
    <form action={logIn}>
      <Button type="submit">Zaloguj się</Button>
    </form>
  );
}
