import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
dotenv.config();
const token = process.env.REVALIDATE_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/");
    if (req.query.new === "trip") {
      await res.revalidate("/news");
      await res.revalidate("/trips");
      await res.revalidate("/form");
    }
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
