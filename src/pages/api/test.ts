import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = new MongoClient(
      process.env.MONGODB_URI!
    );

    await client.connect();

    return res.status(200).json({
      success: true,
      message: "Connected successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: String(error),
    });
  }
}