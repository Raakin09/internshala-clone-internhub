import type {
    NextApiRequest,
    NextApiResponse,
  } from "next";
  
  import client from "@/lib/mongodb";
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const mongo =
        await client;
  
      const db =
        mongo.db("internhub");
  
      const internships =
        await db
          .collection("internships")
          .find({})
          .sort({
            createdAt: -1,
          })
          .toArray();
  
      return res.status(200).json({
        success: true,
        internships,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      });
    }
  }