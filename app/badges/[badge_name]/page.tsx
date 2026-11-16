export const revalidate = 86400; // 24 hours

import { notFound } from "next/navigation";
import BadgeTabs from "@/components/badge/BadgeTabs";
import Main from "@/components/ui/Main";
import { getElementorPage } from "@/lib/db";
import { getCachedBadgeScorers } from "@/lib/db-cached";
import { prisma } from "@/lib/prisma";
import type { ElementorData } from "@/types";

const getData = async (params: { badge_name?: string }) => {
  if (!params?.badge_name || typeof params.badge_name !== "string") {
    return;
  }

  const badge = await prisma.badge.findUnique({
    where: { slug: params.badge_name },
    include: {
      degrees: { orderBy: { sort_order: "asc" } },
    },
  });

  if (!badge) {
    notFound();
  }

  const [elementorData, scorers] = await Promise.all([
    badge.rules_page_id
      ? getElementorPage(badge.rules_page_id)
      : Promise.resolve(null),
    getCachedBadgeScorers(params.badge_name),
  ]);

  return {
    badge,
    rulesPageContent: elementorData
      ? (JSON.parse(elementorData) as ElementorData)
      : undefined,
    scorers,
  };
};

type Props = {
  params: Promise<{
    badge_name: string;
  }>;
};
export default async function Badges({ params }: Readonly<Props>) {
  const resParams = await params;
  const data = await getData(resParams);
  if (!data) return null;

  return (
    <Main>
      <div>
        <BadgeTabs
          rulesPageContent={data.rulesPageContent}
          scorers={data.scorers}
          degrees={data.badge.degrees}
        />
      </div>
    </Main>
  );
}
