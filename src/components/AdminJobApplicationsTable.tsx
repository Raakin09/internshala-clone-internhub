import { useEffect, useState } from "react";

import styles from "./ApplicationTable.module.css";

export default function AdminJobApplicationsTable() {
  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchApplications =
      async () => {
        try {
          const res =
            await fetch(
              "/api/job-applications"
            );

          const data =
            await res.json();

          if (
            data.success
          ) {
            setApplications(
              data.applications
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h2>
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>
          Job Applications
        </h1>

        <p>
          Review all job
          applications
        </p>

        <table
          className={styles.table}
        >
          <thead>
            <tr>
              <th>
                Applicant
              </th>

              <th>
                Email
              </th>

              <th>
                Job
              </th>

              <th>
                Company
              </th>

              <th>
                Status
              </th>

              <th>
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map(
              (app) => (
                <tr
                  key={app._id}
                >
                  <td>
                    {
                      app.applicantName
                    }
                  </td>

                  <td>
                    {
                      app.applicantEmail
                    }
                  </td>

                  <td>
                    {
                      app.jobTitle
                    }
                  </td>

                  <td>
                    {app.company}
                  </td>

                  <td>
                    {app.status}
                  </td>

                  <td>
                    {new Date(
                      app.createdAt
                    ).toLocaleDateString()}
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