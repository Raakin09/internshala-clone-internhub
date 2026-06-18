import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./ApplicationTable.module.css";

export default function AdminApplicationTable() {
  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchApplications =
    async () => {
      try {
        const res = await fetch(
          "/api/applications"
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

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const res = await fetch(
        "/api/applications/update",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        fetchApplications();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          All Applications
        </h1>

        <p>
          Review all internship
          applications
        </p>

        <table
          className={styles.table}
        >
          <thead>
            <tr>
            <th>Type</th>
<th>Applicant</th>
<th>Email</th>
<th>Position</th>
<th>Company</th>
<th>Status</th>
<th>Date</th>
<th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(
              (app) => (
                <tr
                  key={app._id}
                >
                  <td>{app.type}</td>

<td>{app.applicantName}</td>

<td>{app.applicantEmail}</td>

<td>{app.position}</td>

<td>{app.company || "-"}</td>

<td>{app.status}</td>

                  <td>
  {new Date(
    app.createdAt
  ).toLocaleDateString()}
</td>

<td>
  <div
    style={{
      display: "flex",
      gap: "8px",
      alignItems: "center",
    }}
  >
    <Link
      href={`/application/${app._id}`}
      style={{
        color: "#2563eb",
        fontWeight: "600",
      }}
    >
      View
    </Link>

    <button
      onClick={() =>
        updateStatus(
          app._id,
          "Accepted"
        )
      }
      style={{
        background: "#22c55e",
        color: "white",
        border: "none",
        padding:
          "6px 10px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Accept
    </button>

    <button
      onClick={() =>
        updateStatus(
          app._id,
          "Rejected"
        )
      }
      style={{
        background: "#ef4444",
        color: "white",
        border: "none",
        padding:
          "6px 10px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Reject
    </button>
  </div>
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