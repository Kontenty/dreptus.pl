import Main from "components/layout/MainLayout";
import { getPage } from "lib/db";
import { PostResponse } from "src/types";
import css from "src/styles//Participant.module.css";

export const getStaticProps = async () => {
  const data = await getPage(19516);
  if (!data) {
    return { notFound: true };
  }
  return {
    props: {
      content: data || null,
      revalidate: 60,
    },
  };
};

type Props = { content: PostResponse };
export default function Participants({ content }: Props) {
  return (
    <Main>
      <article className="flex flex-col gap-3 min-w-[670px] overflow-x-auto">
        {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
        <div
          className={css.mainList}
          dangerouslySetInnerHTML={{ __html: content.post_content }}
        ></div>
      </article>
    </Main>
  );
}
