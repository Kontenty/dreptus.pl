import { logout } from "@/lib/actions/auth.action";

export const LogOutButton = () => (
  <form action={logout}>
    <button
      className="border-white border py-2 px-4 rounded-md text-slate-300 hover:text-slate-50 transition-colors"
      type="submit"
    >
      Wyloguj się
    </button>
  </form>
);
