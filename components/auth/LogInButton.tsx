import { logIn } from "@/lib/actions/auth.action";

export function LogInButton() {
  return (
    <form action={logIn}>
      <button
        className="px-8 py-3 bg-accent-light text-accent-dark rounded-2xl shadow-accent-dark/40 shadow-lg hover:shadow-xl text-lg"
        type="submit"
      >
        Zaloguj się
      </button>
    </form>
  );
}
