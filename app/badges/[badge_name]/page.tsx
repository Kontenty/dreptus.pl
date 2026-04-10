export const revalidate = 86400; // 24 hours

import BadgeTabs from "@/components/badge/BadgeTabs";
import Main from "@/components/ui/Main";
import { getElementorPage, getPage } from "@/lib/db";
import type { ElementorData } from "@/types";

const dict: Record<string, { rules: number; scorers: number }> = {
  "z-dreptusiem-po-polsce": { rules: 11620, scorers: 21255 },
  "z-dreptusiem-po-dolinie-bugu": { rules: 11617, scorers: 21319 },
  "z-dreptusiem-traktem-krolewskim": { rules: 14076, scorers: 21322 },
};

const getData = async (params: { badge_name?: string }) => {
  if (!params?.badge_name || typeof params.badge_name !== "string") {
    return;
  }
  const { rules: rulesPageId, scorers: scorersPageId } = dict[
    params.badge_name
  ] || {
    rules: 11620,
    scorers: 21255,
  };
  const elementorData = await getElementorPage(rulesPageId);
  const pageData = await getPage(scorersPageId);

  return {
    rulesPageContent: JSON.parse(elementorData ?? "[]") as ElementorData,
    scorersContent: pageData?.post_content ?? "",
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
  return (
    <Main>
      <div>
        <BadgeTabs
          rulesPageContent={data?.rulesPageContent}
          scorersContent={data?.scorersContent}
        />
      </div>
    </Main>
  );
}
