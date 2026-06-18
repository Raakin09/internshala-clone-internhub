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
      const mongoClient = await client;
  
      const db =
        mongoClient.db("internhub");
  
      const totalInternships =
        await db
          .collection("internships")
          .countDocuments();
  
      const totalJobs =
        await db
          .collection("jobs")
          .countDocuments();
  
      const internshipApplications =
        await db
          .collection("applications")
          .countDocuments();
  
      const jobApplications =
        await db
          .collection("jobApplications")
          .countDocuments();
  
      const pendingInternships =
        await db
          .collection("applications")
          .countDocuments({
            status: "Pending",
          });
  
      const pendingJobs =
        await db
          .collection("jobApplications")
          .countDocuments({
            status: "Pending",
          });
  
      res.status(200).json({
        success: true,
  
        stats: {
          totalInternships,
          totalJobs,
          internshipApplications,
          jobApplications,
  
          pendingApplications:
            pendingInternships +
            pendingJobs,
        },
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
      });
    }
  }