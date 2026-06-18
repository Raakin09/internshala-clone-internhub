import type {
    NextApiRequest,
    NextApiResponse,
  } from "next";
  
  import client from "@/lib/mongodb";
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
      });
    }
  
    try {
      const {
        name,
        email,
        photoURL,
      } = req.body;
  
      const mongoClient =
        await client;
  
      const db =
        mongoClient.db("internhub");
  
      const existingUser =
        await db
          .collection("users")
          .findOne({
            email,
          });
  
      if (!existingUser) {
        await db
          .collection("users")
          .insertOne({
            name,
            email,
            photoURL,
            role: "user",
            createdAt:
              new Date(),
          });
      }
  
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
      });
    }
  }