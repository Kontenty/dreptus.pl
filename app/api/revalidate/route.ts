import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, slug } = body;

    const host = request.headers.get("host");

    if (host?.includes("dreptus.vercel.app")) {
      await fetch(
        `https://xn--dreptu-8ib.pl/api/revalidate?type=${type}&slug=${slug || ""}`,
      );
      return NextResponse.json({ revalidated: true });
    }

    const pathsToRevalidate: string[] = [];

    if (type === "trip") {
      pathsToRevalidate.push("/", "/news", "/trips", "/form");
      if (slug) {
        pathsToRevalidate.push(`/trips/${slug}`);
      }
      revalidateTag("trips", "max");
    } else if (type === "participant") {
      pathsToRevalidate.push("/participants");
      if (slug) {
        pathsToRevalidate.push(`/participants/${slug}`);
      }
    } else if (type === "packet") {
      pathsToRevalidate.push("/news");
    } else if (type === "scorer" && slug) {
      pathsToRevalidate.push(`/badges/${slug}`);
    } else {
      return NextResponse.json(
        {
          error: "Invalid type. Valid types: trip, participant, packet, scorer",
        },
        { status: 400 },
      );
    }

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
