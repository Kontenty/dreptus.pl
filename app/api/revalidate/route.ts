import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const VALID_TAGS = ["trips", "trips-all", "locations", "trips-count"] as const;

type ValidTag = (typeof VALID_TAGS)[number];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tags, tag } = body;

    const tagsToRevalidate: ValidTag[] = [];

    if (tag && typeof tag === "string") {
      tagsToRevalidate.push(tag as ValidTag);
    } else if (Array.isArray(tags)) {
      tagsToRevalidate.push(...(tags as ValidTag[]));
    } else {
      return NextResponse.json(
        {
          error:
            'Invalid request body. Provide "tag" (string) or "tags" (array)',
        },
        { status: 400 },
      );
    }

    const revalidated: string[] = [];
    const invalid: string[] = [];

    for (const t of tagsToRevalidate) {
      if (VALID_TAGS.includes(t)) {
        revalidateTag(t, "max");
        revalidated.push(t);
      } else {
        invalid.push(t);
      }
    }

    if (revalidated.length === 0) {
      return NextResponse.json(
        {
          error: "No valid tags provided",
          validTags: VALID_TAGS,
          invalidTags: invalid,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      revalidated: true,
      tags: revalidated,
      invalid: invalid.length > 0 ? invalid : undefined,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
