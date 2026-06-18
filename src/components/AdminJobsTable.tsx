import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ApplicationTable.module.css";

export default function AdminJobsTable() {
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
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h2>
            Loading Jobs...
          </h2>
        </div>
      </div>
    );
  }
  const handleDelete =
  async (id: string) => {
    const confirmed =
      window.confirm(
        "Delete this job?"
      );

    if (!confirmed) return;

    try {
      const res =
        await fetch(
          `/api/jobs/delete/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await res.json();

      if (data.success) {
        setJobs(
          jobs.filter(
            (job) =>
              job._id !== id
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>
          Manage Jobs
        </h1>

        <p>
          View all posted jobs
        </p>

        <table
          className={styles.table}
        >
          <thead>
            <tr>
              <th>
                Title
              </th>

              <th>
                Company
              </th>

              <th>
                Location
              </th>

              <th>
                Salary
              </th>

              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.map(
              (job) => (
                <tr
                  key={job._id}
                >
                  <td>
                    {job.title}
                  </td>

                  <td>
                    {
                      job.company
                    }
                  </td>

                  <td>
                    {
                      job.location
                    }
                  </td>

                  <td>
                    {
                      job.salary
                    }
                  </td>

                  <td>
  <Link
    href={`/job/${job._id}`}
  >
    View
  </Link>

  {" | "}

  <button
    onClick={() =>
      handleDelete(
        job._id
      )
    }
    style={{
      border: "none",
      background:
        "transparent",
      color: "red",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}