import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const token = process.env.REVALIDATE_TOKEN;

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== token) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const host = request.headers.get("host");

  if (host?.includes("dreptus.vercel.app")) {
    await fetch(
      `https://xn--dreptu-8ib.pl${request.nextUrl.toString().replace(request.nextUrl.origin, "")}`,
    );
    return NextResponse.json({ revalidated: true });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  const type = request.nextUrl.searchParams.get("new");

  try {
    if (type === "trip") {
      const promises = [
        revalidatePath("/"),
        revalidatePath("/news"),
        revalidatePath("/trips"),
        revalidatePath("/form"),
      ];
      if (slug) {
        promises.push(revalidatePath(`/trips/${slug}`));
      }
      await Promise.all(promises);
    } else if (type === "participant") {
      if (slug) {
        await Promise.all([
          revalidatePath("/participants"),
          revalidatePath(`/participants/${slug}`),
        ]);
      } else {
        await revalidatePath("/participants");
      }
    } else if (type === "packet") {
      await revalidatePath("/news");
    } else if (type === "scorer" && slug) {
      await revalidatePath(`/badges/${slug}`);
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}
