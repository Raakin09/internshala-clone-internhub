import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function ApplicationDetail() {
  const router = useRouter();

  const { id } = router.query;

  const [application, setApplication] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchApplication =
      async () => {
        try {
          const res = await fetch(
            `/api/applications/${id}`
          );

          const data =
            await res.json();

          if (data.success) {
            setApplication(
              data.application
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          Loading...
        </div>

        <Footer />
      </>
    );
  }

  if (!application) {
    return (
      <>
        <Navbar />

        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          Application Not Found
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1>
          Application Details
        </h1>

        <hr />

        <p>
          <strong>
            Applicant:
          </strong>{" "}
          {
            application.applicantName
          }
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {
            application.applicantEmail
          }
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {application.phone}
        </p>

        <p>
          <strong>
            Position:
          </strong>{" "}
          {application.internshipTitle ||
            application.jobTitle}
        </p>

        <p>
          <strong>
            Company:
          </strong>{" "}
          {application.company}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {application.status}
        </p>

        <p>
          <strong>
            Resume:
          </strong>{" "}
          <a
            href={
              application.resume
            }
            target="_blank"
            rel="noreferrer"
          >
            Open Resume
          </a>
        </p>

        {application.coverLetter && (
          <>
            <p>
              <strong>
                Cover Letter:
              </strong>
            </p>

            <div
              style={{
                padding: "15px",
                background:
                  "#f5f5f5",
                borderRadius:
                  "8px",
              }}
            >
              {
                application.coverLetter
              }
            </div>
          </>
        )}

        <br />

        <p>
          <strong>
            Applied On:
          </strong>{" "}
          {new Date(
            application.createdAt
          ).toLocaleDateString()}
        </p>
      </div>

      <Footer />
    </>
  );
}