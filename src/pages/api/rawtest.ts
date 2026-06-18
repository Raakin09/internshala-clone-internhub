import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    return res.status(200).json({
      envExists: !!process.env.MONGODB_URI,
      envValue: process.env.MONGODB_URI?.substring(0, 30),
    });
  } catch (err) {
    return res.status(500).json({
      error: String(err),
    });
  }
}