import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { log } from "next-axiom";
dotenv.config();
const token = process.env.REVALIDATE_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query?.secret !== token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (req.headers.host?.includes("dreptus.vercel.app")) {
    await fetch(`https://xn--dreptu-8ib.pl${req?.url}`);
    return res.json({ revalidated: true });
  }

  const slug = req.query?.slug;
  const newElement = req.query?.new;

  try {
    if (newElement === "trip") {
      const promises = [
        res.revalidate("/"),
        res.revalidate("/news"),
        res.revalidate("/trips"),
        res.revalidate("/form"),
      ];
      if (slug) {
        promises.push(res.revalidate(`/trips/${slug}`));
      }
      await Promise.all(promises);
    } else if (newElement === "participant") {
      if (slug) {
        await Promise.all([
          res.revalidate("/participants"),
          res.revalidate(`/participants/${slug}`),
        ]);
      } else {
        await res.revalidate("/participants");
      }
    } else if (newElement === "packet") {
      await res.revalidate("/news");
    } else if (newElement === "scorer" && slug) {
      await res.revalidate(`/badges/${slug}`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    if (err instanceof Error) {
      log.error("Revalidation error", { name: err.name, error: err.message });
    } else {
      log.error("Revalidation error", { error: JSON.stringify(err) });
    }
    return res.status(500).send("Error revalidating");
  }
}
