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
    const response = await fetch(`https://xn--dreptu-8ib.pl${req?.url}`);
    const data = await response.json();
    return res.json(data);
  }

  const slug = req.query?.slug;

  try {
    if (req.query?.new === "trip") {
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
    } else if (req.query?.new === "participant") {
      if (slug) {
        await Promise.all([
          res.revalidate("/participants"),
          res.revalidate(`/participants/${slug}`),
        ]);
      } else {
        await res.revalidate("/participants");
      }
    } else if (req.query?.new === "packet") {
      await res.revalidate("/news");
    } else if (req.query?.new === "scorer" && slug) {
      await res.revalidate(`/badges/${slug}`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    log.error("Revalidation error", { error: err });
    return res.status(500).send("Error revalidating");
  }
}
