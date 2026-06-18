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
  
      const applications =
        await db
          .collection(
            "jobApplications"
          )
          .find({})
          .sort({
            createdAt: -1,
          })
          .toArray();
  
      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
      });
    }
  }