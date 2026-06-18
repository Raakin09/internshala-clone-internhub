import styles from "./Jobs.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  BsGeoAlt,
  BsWallet2,
  BsCalendar,
  BsArrowUpRight,
} from "react-icons/bs";

export default function Jobs() {
  const [jobs, setJobs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchJobs =
      async () => {
        try {
          const res =
            await fetch("/api/jobs");

          const data =
            await res.json();

          if (data.success) {
            setJobs(
              data.jobs.slice(0, 3)
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchJobs();
  }, []);

  const stats = [
    {
      number: "300K+",
      label: "companies hiring",
    },
    {
      number: "10K+",
      label: "new openings everyday",
    },
    {
      number: "21Mn+",
      label: "active students",
    },
    {
      number: "600K+",
      label: "learners",
    },
  ];

  if (loading) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>
        Latest Jobs
      </h2>

      <div className={styles.cardContainer}>
        {jobs.map((job) => (
          <div
            key={job._id}
            className={styles.card}
          >
            <div
              className={styles.hiring}
            >
              <BsArrowUpRight />
              <span>
                Actively Hiring
              </span>
            </div>

            <h3>
              {job.title ||
                job.jobTitle ||
                "Job"}
            </h3>

            <p
              className={
                styles.company
              }
            >
              {job.company}
            </p>

            <div
              className={
                styles.info
              }
            >
              <BsGeoAlt />
              <span>
                {job.location}
              </span>
            </div>

            <div
              className={
                styles.info
              }
            >
              <BsWallet2 />
              <span>
                {job.salary ||
                  job.stipend ||
                  "Not specified"}
              </span>
            </div>

            <div
              className={
                styles.info
              }
            >
              <BsCalendar />
              <span>
                {job.duration ||
                  "Not specified"}
              </span>
            </div>

            <div
              className={
                styles.footer
              }
            >
              <span
                className={
                  styles.tag
                }
              >
                Jobs
              </span>

              <Link
                href={`/job/${job._id}`}
                className={
                  styles.viewBtn
                }
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        className={
          styles.statsBox
        }
      >
        {stats.map(
          (item, index) => (
            <div
              key={index}
              className={
                styles.statItem
              }
            >
              <h2>
                {item.number}
              </h2>

              <p>
                {item.label}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}