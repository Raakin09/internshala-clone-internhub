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
        const mongoClient =
        await client;
      
      const db =
        mongoClient.db("internhub");
  
      const jobs = await db
        .collection("jobs")
        .find({})
        .toArray();
  
      return res.status(200).json({
        success: true,
        jobs,
      });
    } catch (error) {
      console.error(
        "JOBS API ERROR:",
        error
      );
  
      return res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    }
  }