import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

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
    const email = req.query.email;

    const mongoClient =
      await client;

    const db =
      mongoClient.db("internhub");

    const internshipApplications =
      await db
        .collection("applications")
        .find({
          applicantEmail: email,
        })
        .toArray();

    const jobApplications =
      await db
        .collection(
          "jobApplications"
        )
        .find({
          applicantEmail: email,
        })
        .toArray();

    const applications = [
      ...internshipApplications.map(
        (app) => ({
          ...app,
          type: "Internship",
        })
      ),

      ...jobApplications.map(
        (app) => ({
          ...app,
          type: "Job",
        })
      ),
    ].sort(
      (a: any, b: any) =>
        new Date(
          b.createdAt
        ).getTime() -
        new Date(
          a.createdAt
        ).getTime()
    );

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