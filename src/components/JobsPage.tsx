import { useEffect, useState } from "react";
import styles from "./JobsPage.module.css";
import Link from "next/link";

import {
  BsGeoAlt,
  BsWallet2,
  BsCalendar,
  BsArrowUpRight,
} from "react-icons/bs";

const JobsPage = () => {
  const [jobs, setJobs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchJobs =
      async () => {
        try {
          const res =
            await fetch(
              "/api/jobs"
            );

          const data =
            await res.json();

          if (
            data.success
          ) {
            setJobs(
              data.jobs
            );
          }
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div
        className={
          styles.container
        }
      >
        <h2>
          Loading Jobs...
        </h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
    
      <div className={styles.filterBox}>
        <div className={styles.filterHeader}>
          <h3>Filters</h3>
          <p>Clear all</p>
        </div>

        <div className={styles.inputGroup}>
          <label>Category</label>

          <input
            type="text"
            placeholder="e.g. Software Development"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Location</label>

          <input
            type="text"
            placeholder="e.g. Chandigarh"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Experience</label>

          <input
            type="text"
            placeholder="e.g. 2 years"
          />
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" />
          <label>
            Work from home
          </label>
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" />
          <label>
            Part-time
          </label>
        </div>

        <div className={styles.salarySection}>
          <label>
            Annual Salary (₹ in lakhs)
          </label>

          <input
            type="range"
            min="0"
            max="100"
          />

          <div className={styles.rangeText}>
            <span>₹0L</span>
            <span>₹50L</span>
            <span>₹100L</span>
          </div>
        </div>
      </div>

      
      <div className={styles.jobsSection}>
        <div className={styles.jobsFound}>
          <p>
            {jobs.length} Jobs found
          </p>
        </div>

        {jobs.map((job) => (
          <div
            key={job._id}
            className={styles.jobCard}
          >
            <div className={styles.hiring}>
              <BsArrowUpRight />

              <span>
                Actively Hiring
              </span>
            </div>

            <h2>
              {job.title}
            </h2>

            <p
              className={
                styles.company
              }
            >
              {job.company}
            </p>

            <div
              className={
                styles.jobDetails
              }
            >
              <div>
                <BsCalendar />

                <div>
                  <p>
                    Posted On
                  </p>

                  <span>
                    {job.createdAt
                      ? new Date(
                          job.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div>
                <BsGeoAlt />

                <div>
                  <p>
                    Experience
                  </p>

                  <span>
                    {
                      job.experience
                    }
                  </span>
                </div>
              </div>

              <div>
                <BsWallet2 />

                <div>
                  <p>
                    Salary
                  </p>

                  <span>
                    {
                      job.salary
                    }
                  </span>
                </div>
              </div>
            </div>

            <div
              className={
                styles.bottomRow
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
    </div>
  );
};

export default JobsPage;