import Main from "components/layout/MainLayout";
import { getElementorPage } from "lib/db";
import { ElementorData, ElementorElement } from "src/types";

export const getStaticProps = async () => {
  const content = await getElementorPage(9850);
  return {
    props: {
      content: JSON.parse(content) || null,
    }, // will be passed to the page component as props
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapElementor = (node: ElementorElement): any => {
  if (node?.settings?.title) {
    return (
      <h1
        key={node.id}
        className="text-4xl text-center mb-4"
        dangerouslySetInnerHTML={{ __html: node.settings.title }}
      ></h1>
    );
  }
  if (node?.settings?.editor) {
    return (
      <div
        key={node.id}
        className="elementor"
        dangerouslySetInnerHTML={{
          __html: node.settings.editor.replaceAll('style="color: #000080;', ""),
        }}
      ></div>
    );
  }
  if (node?.elements.length) {
    if (node.elType === "section") {
      return (
        <div
          key={node.id}
          style={{
            display: "grid",
            gridTemplateColumns: `9fr 1fr 2fr`,
          }}
        >
          {node?.elements.map(mapElementor)}
        </div>
      );
    }
    if (node.elType === "column") {
      return (
        <div key={node.id} style={{ display: "flex", flexDirection: `column` }}>
          {node?.elements.map(mapElementor)}
        </div>
      );
    }
    return node?.elements.map(mapElementor);
  }
};

type Props = { content: ElementorData };
export default function Participants({ content }: Props) {
  return (
    <Main>
      <article className="flex flex-col gap-3 min-w-[670px] overflow-x-auto">
        {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
        {content
          ? content?.[0].elements.map((el) => {
              if (el.settings.title) {
                return <h1 key={el.id}>{el.settings.title}</h1>;
              }
              if (el.settings.editor) {
                return <section key={el.id}>{el.settings.editor}</section>;
              }
              if (el?.elements?.length) {
                return el.elements.map(mapElementor);
              }
            })
          : null}
      </article>
    </Main>
  );
}
