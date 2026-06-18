import type {
    NextApiRequest,
    NextApiResponse,
  } from "next";
  
  import { ObjectId } from "mongodb";
  
  import client from "@/lib/mongodb";
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== "GET") {
      return res.status(405).json({
        message: "Method not allowed",
      });
    }
  
    try {
      const { id } = req.query;
  
      const mongoClient =
  await client;

const db =
  mongoClient.db("internhub");
  
      const internship =
        await db
          .collection("internships")
          .findOne({
            _id: new ObjectId(
              id as string
            ),
          });
  
      res.status(200).json({
        success: true,
        internship,
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
      });
    }
  }
  