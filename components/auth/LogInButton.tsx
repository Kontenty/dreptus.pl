import { Button } from "primereact/button";
import { logIn } from "@/lib/actions/auth.action";

export function LogInButton() {
  return (
    <form action={logIn}>
      <Button type="submit">Zaloguj się</Button>
    </form>
  );
}
