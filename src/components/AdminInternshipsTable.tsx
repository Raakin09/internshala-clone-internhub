import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ApplicationTable.module.css";

export default function AdminInternshipsTable() {
  const [internships, setInternships] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchInternships =
      async () => {
        try {
          const res = await fetch(
            "/api/internships"
          );

          const data =
            await res.json();

          if (data.success) {
            setInternships(
              data.internships
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchInternships();
  }, []);

  const handleDelete =
    async (id: string) => {
      const confirmed =
        window.confirm(
          "Delete this internship?"
        );

      if (!confirmed) return;

      try {
        const res = await fetch(
          `/api/internships/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        const data =
          await res.json();

        if (data.success) {
          setInternships(
            internships.filter(
              (
                internship
              ) =>
                internship._id !==
                id
            )
          );
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
            Loading Internships...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>
          Manage Internships
        </h1>

        <p>
          View all posted
          internships
        </p>

        <table
          className={styles.table}
        >
          <thead>
            <tr>
              <th>Title</th>

              <th>Company</th>

              <th>Location</th>

              <th>Stipend</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {internships.map(
              (
                internship
              ) => (
                <tr
                  key={
                    internship._id
                  }
                >
                  <td>
                    {
                      internship.title
                    }
                  </td>

                  <td>
                    {
                      internship.company
                    }
                  </td>

                  <td>
                    {
                      internship.location
                    }
                  </td>

                  <td>
                    {
                      internship.stipend
                    }
                  </td>

                  <td>
                    <Link
                      href={`/internship/${internship._id}`}
                    >
                      View
                    </Link>

                    {" | "}

                    <button
                      onClick={() =>
                        handleDelete(
                          internship._id
                        )
                      }
                      style={{
                        border:
                          "none",
                        background:
                          "transparent",
                        color:
                          "red",
                        cursor:
                          "pointer",
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