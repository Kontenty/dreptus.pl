import { logIn } from "@/lib/actions/auth.action";
import { Button } from "primereact/button";

export function LogInButton() {
  return (
    <form action={logIn}>
      <Button type="submit">Zaloguj się</Button>
    </form>
  );
}
