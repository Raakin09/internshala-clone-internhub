import { useEffect, useState } from "react";
import styles from "./ApplicationTable.module.css";
import { useAuth } from "@/context/AuthContext";

export default function ApplicationTable() {
  const { user } = useAuth();

  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchApplications =
      async () => {
        try {
          const res = await fetch(
            `/api/applications/user?email=${user.email}`
          );

          const data =
            await res.json();

          if (data.success) {
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
  }, [user]);

  const internshipApplications =
    applications.filter(
      (app) =>
        app.type ===
        "Internship"
    );

  const jobApplications =
    applications.filter(
      (app) =>
        app.type === "Job"
    );

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h2>
            Loading Applications...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>
          My Applications
        </h1>

        {/* Internship Applications */}

        <h2
          style={{
            marginTop: "20px",
          }}
        >
          Internship Applications
        </h2>

        {internshipApplications.length ===
        0 ? (
          <p>
            No internship
            applications found.
          </p>
        ) : (
          <table
            className={styles.table}
          >
            <thead>
              <tr>
                <th>
                  Internship
                </th>

                <th>
                  Company
                </th>

                <th>Status</th>

                <th>
                  Applied Date
                </th>
              </tr>
            </thead>

            <tbody>
              {internshipApplications.map(
                (app) => (
                  <tr
                    key={app._id}
                  >
                    <td>
                      {
                        app.internshipTitle
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
        )}

        {/* Job Applications */}

        <h2
          style={{
            marginTop: "40px",
          }}
        >
          Job Applications
        </h2>

        {jobApplications.length ===
        0 ? (
          <p>
            No job
            applications found.
          </p>
        ) : (
          <table
            className={styles.table}
          >
            <thead>
              <tr>
                <th>Job</th>

                <th>
                  Company
                </th>

                <th>Status</th>

                <th>
                  Applied Date
                </th>
              </tr>
            </thead>

            <tbody>
              {jobApplications.map(
                (app) => (
                  <tr
                    key={app._id}
                  >
                    <td>
                      {app.jobTitle}
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
        )}
      </div>
    </div>
  );
}