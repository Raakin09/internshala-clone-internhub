import { useRouter } from "next/router";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

import JobDetailPage from "@/components/JobDetailPage";

export default function JobDetail() {
  const router = useRouter();

  const { id } = router.query;

  const [job, setJob] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchJob =
      async () => {
        try {
          const res =
            await fetch(
              `/api/jobs/${id}`
            );

          const data =
            await res.json();

          if (
            data.success
          ) {
            setJob(data.job);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h1>
    );
  }

  if (!job) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Job Not Found
      </h1>
    );
  }

  return (
    <>
      <Navbar />

      <JobDetailPage
        job={job}
      />

      <Footer />
    </>
  );
}