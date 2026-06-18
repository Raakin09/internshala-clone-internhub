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
    const mongoClient = await client;

    const db =
      mongoClient.db("internhub");

    const internshipApplications =
      await db
        .collection("applications")
        .find({})
        .toArray();

    const jobApplications =
      await db
        .collection(
          "jobApplications"
        )
        .find({})
        .toArray();

    const formattedInternships =
      internshipApplications.map(
        (app: any) => ({
          ...app,
          type: "Internship",
          position:
            app.internshipTitle,
        })
      );

    const formattedJobs =
      jobApplications.map(
        (app: any) => ({
          ...app,
          type: "Job",
          position:
            app.jobTitle,
        })
      );

    const applications = [
      ...formattedInternships,
      ...formattedJobs,
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