import { Prisma } from "@prisma/client";
import { TripDetails } from "@/types/gql/graphql";
import { GraphQLContext } from "../context";

export const getTripBySlug = async (
  _parent: unknown,
  { trip_name }: { trip_name: string },
  { prisma }: GraphQLContext
): Promise<TripDetails | null> => {
  try {
    const idData = await prisma.wp_posts.findFirst({
      select: { ID: true },
      where: { post_name: trip_name },
    });
    const id = idData?.ID;
    if (!id) {
      return null;
    }
    const query = Prisma.sql`SELECT ID, post_title, post_content,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_images' ) as images_str,
      (SELECT guid FROM wp_posts WHERE ID = (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key="_cth_menu_pdf") ) AS pdf,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_zxr0feyjz' ) as number,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_15kr29dj3' ) as author,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_nv0mho3ts' ) as length,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_yjar0aoq6' ) as pk,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_boz3z5wv9' ) as founding,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_0o5uhb4c9' ) as type,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_latitude' ) AS lat,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_longitude' ) AS lng,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_i5t95ytae' ) AS pdf_images_str
      FROM wp_posts WHERE ID = ${id}`;
    const trip = (await prisma.$queryRaw<TripDetails[]>`${query}`).at(0);
    if (!trip) {
      return null;
    }

    const images = await prisma.wp_posts.findMany({
      select: { ID: true, guid: true, post_title: true },
      where: {
        ID: { in: trip?.images_str?.split(",").map((n) => Number(n)) },
      },
    });

    const pdfImages = await prisma.wp_posts.findMany({
      select: { ID: true, guid: true, post_title: true },
      where: {
        ID: { in: trip?.pdf_images_str?.split(",").map((n) => Number(n)) },
      },
    });

    return { ...trip, images, pdfImages };
  } catch (error) {
    return null;
  }
};
