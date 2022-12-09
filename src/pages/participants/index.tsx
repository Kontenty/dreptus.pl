import Main from "components/layout/MainLayout";
import { getPage } from "lib/db";
import { PostResponse } from "src/types";
import css from "src/styles//Participant.module.css";

export const getStaticProps = async () => {
  const data = await getPage(19516);
  if (!data) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error("Failed to fetch participants data");
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
