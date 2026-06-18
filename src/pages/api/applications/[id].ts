import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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

    let application =
      await db
        .collection(
          "applications"
        )
        .findOne({
          _id: new ObjectId(
            id as string
          ),
        });

    if (!application) {
      application =
        await db
          .collection(
            "jobApplications"
          )
          .findOne({
            _id: new ObjectId(
              id as string
            ),
          });
    }

    if (!application) {
      return res.status(404).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}