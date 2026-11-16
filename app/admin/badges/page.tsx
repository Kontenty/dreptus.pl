import { getBadges } from "@/lib/actions/get-badges";
import BadgeScorerManager from "./BadgeScorerManager";

export default async function AdminBadgesPage() {
  const badges = await getBadges();

  return (
    <section aria-labelledby="admin-badges-title" className="space-y-6">
      <header className="max-w-2xl space-y-2">
        <h2 id="admin-badges-title" className="text-3xl">
          Odznaki
        </h2>
        <p className="text-sm leading-6 text-brand-text md:text-base">
          Zarzadzaj odznakami, stopniami i zdobywcami z jednego miejsca.
        </p>
      </header>
      <BadgeScorerManager initialBadges={badges} />
    </section>
  );
}
