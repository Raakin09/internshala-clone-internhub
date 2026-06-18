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
  if (req.method !== "PUT") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { id, status } = req.body;

    const mongoClient =
      await client;

    const db =
      mongoClient.db("internhub");

    // Try internship applications first
    const internshipResult =
      await db
        .collection("applications")
        .updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: {
              status,
            },
          }
        );

    // If not found, try job applications
    if (
      internshipResult.matchedCount ===
      0
    ) {
      await db
        .collection(
          "jobApplications"
        )
        .updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: {
              status,
            },
          }
        );
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown Error",
    });
  }
}