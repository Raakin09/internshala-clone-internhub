import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const mongoClient =
  await client;

const db =
  mongoClient.db("internhub");
  
    const internship = {
      ...req.body,
      createdAt: new Date(),
    };
  
    const result = await db
      .collection("internships")
      .insertOne(internship);
  
    res.status(201).json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
  
    res.status(500).json({
      success: false,
    });
  }
}