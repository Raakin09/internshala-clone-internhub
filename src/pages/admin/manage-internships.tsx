import { useEffect, useState } from "react";

export default function ManageInternships() {
  const [
    internships,
    setInternships,
  ] = useState<any[]>([]);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships =
    async () => {
      const res = await fetch(
        "/api/admin/internships"
      );

      const data =
        await res.json();

      if (data.success) {
        setInternships(
          data.internships
        );
      }
    };

    const deleteInternship =
  async (id: string) => {
    const confirmDelete =
      window.confirm(
        "Delete this internship?"
      );

    if (!confirmDelete) return;

    const res =
      await fetch(
        `/api/admin/internships/delete/${id}`,
        {
          method: "DELETE",
        }
      );

    const data =
      await res.json();

    if (data.success) {
      fetchInternships();
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
        }}
      >
        Manage Internships
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        View and manage all
        internships posted on
        the platform.
      </p>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "#f8f9fa",
              }}
            >
              <th
                style={{
                  padding:
                    "16px",
                  textAlign:
                    "left",
                }}
              >
                Title
              </th>

              <th
                style={{
                  padding:
                    "16px",
                  textAlign:
                    "left",
                }}
              >
                Company
              </th>

              <th
                style={{
                  padding:
                    "16px",
                  textAlign:
                    "left",
                }}
              >
                Location
              </th>

              <th
                style={{
                  padding:
                    "16px",
                  textAlign:
                    "center",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {internships.map(
              (
                internship,
                index
              ) => (
                <tr
                  key={
                    internship._id
                  }
                  style={{
                    borderBottom:
                      index !==
                      internships.length -
                        1
                        ? "1px solid #eee"
                        : "none",
                  }}
                >
                  <td
                    style={{
                      padding:
                        "16px",
                    }}
                  >
                    {
                      internship.title
                    }
                  </td>

                  <td
                    style={{
                      padding:
                        "16px",
                    }}
                  >
                    {internship.company ||
                      "-"}
                  </td>

                  <td
                    style={{
                      padding:
                        "16px",
                    }}
                  >
                    {internship.location ||
                      "-"}
                  </td>

                  <td
                    style={{
                      padding:
                        "16px",
                      textAlign:
                        "center",
                    }}
                  >
                    <button
  onClick={() =>
    deleteInternship(
      internship._id
    )
  }
  style={{
    background:
      "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Delete
</button>
                  </td>
                </tr>
              )
            )}

            {internships.length ===
              0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding:
                      "40px",
                    textAlign:
                      "center",
                    color:
                      "#888",
                  }}
                >
                  No internships
                  found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}