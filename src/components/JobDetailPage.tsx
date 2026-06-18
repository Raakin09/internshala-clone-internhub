import {
    useState,
  } from "react";
  
  import styles from "./JobDetailPage.module.css";
  
  export default function JobDetailPage({
    job,
  }: {
    job: any;
  }) {
    const [showModal, setShowModal] =
      useState(false);
  
    const [success, setSuccess] =
      useState(false);
  
    const [formData, setFormData] =
      useState({
        name: "",
        email: "",
        phone: "",
        resume: "",
      });
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };
  
    const handleSubmit =
      async () => {
        try {
          const res =
            await fetch(
              "/api/job-applications/create",
              {
                method: "POST",
  
                headers: {
                  "Content-Type":
                    "application/json",
                },
  
                body: JSON.stringify({
                  jobId:
                    job._id,
  
                  jobTitle:
                    job.title,
  
                  company:
                    job.company,
  
                  applicantName:
                    formData.name,
  
                  applicantEmail:
                    formData.email,
  
                  phone:
                    formData.phone,
  
                  resume:
                    formData.resume,
                }),
              }
            );
  
          const data =
            await res.json();
  
          if (
            data.success
          ) {
            setSuccess(true);
  
            setTimeout(
              () => {
                setShowModal(
                  false
                );
  
                setSuccess(
                  false
                );
              },
              2000
            );
          }
        } catch (error) {
          console.error(
            error
          );
        }
      };
  
    return (
      <div
        className={
          styles.wrapper
        }
      >
        <div
          className={
            styles.card
          }
        >
          <h1>
            {job.title}
          </h1>
  
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
            <p>
              <strong>
                Location:
              </strong>{" "}
              {
                job.location
              }
            </p>
  
            <p>
              <strong>
                Salary:
              </strong>{" "}
              {job.salary}
            </p>
  
            <p>
              <strong>
                Experience:
              </strong>{" "}
              {
                job.experience
              }
            </p>
  
            <p>
              <strong>
                Category:
              </strong>{" "}
              {
                job.category
              }
            </p>
          </div>
  
          <hr />
  
          <h2>
            About Company
          </h2>
  
          <p>
            {
              job.aboutCompany
            }
          </p>
  
          <h2>
            About Job
          </h2>
  
          <p>
            {job.aboutJob}
          </p>
  
          <h2>
            Skills Required
          </h2>
  
          <p>
            {job.skills}
          </p>
  
          <h2>
            Apply Link
          </h2>
  
          <a
            href={
              job.applyLink
            }
            target="_blank"
            rel="noreferrer"
          >
            Apply Here
          </a>
  
          <h2>
            Additional
            Information
          </h2>
  
          <p>
            {
              job.additionalInfo
            }
          </p>
  
          <button
            onClick={() =>
              setShowModal(
                true
              )
            }
            style={{
              marginTop:
                "20px",
              padding:
                "12px 24px",
              background:
                "#2563eb",
              color:
                "white",
              border:
                "none",
              borderRadius:
                "6px",
              cursor:
                "pointer",
            }}
          >
            Apply Now
          </button>
        </div>
  
        {showModal && (
          <div
            style={{
              position:
                "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.5)",
              display:
                "flex",
              justifyContent:
                "center",
              alignItems:
                "center",
            }}
          >
            <div
              style={{
                background:
                  "white",
                padding:
                  "30px",
                borderRadius:
                  "10px",
                width:
                  "400px",
              }}
            >
              {!success ? (
                <>
                  <h2>
                    Apply for
                    Job
                  </h2>
  
                  <input
                    name="name"
                    placeholder="Full Name"
                    onChange={
                      handleChange
                    }
                    style={{
                      width:
                        "100%",
                      marginBottom:
                        "10px",
                      padding:
                        "10px",
                    }}
                  />
  
                  <input
                    name="email"
                    placeholder="Email"
                    onChange={
                      handleChange
                    }
                    style={{
                      width:
                        "100%",
                      marginBottom:
                        "10px",
                      padding:
                        "10px",
                    }}
                  />
  
                  <input
                    name="phone"
                    placeholder="Phone"
                    onChange={
                      handleChange
                    }
                    style={{
                      width:
                        "100%",
                      marginBottom:
                        "10px",
                      padding:
                        "10px",
                    }}
                  />
  
                  <input
                    name="resume"
                    placeholder="Resume Link"
                    onChange={
                      handleChange
                    }
                    style={{
                      width:
                        "100%",
                      marginBottom:
                        "10px",
                      padding:
                        "10px",
                    }}
                  />
  
                  <button
                    onClick={
                      handleSubmit
                    }
                  >
                    Submit
                  </button>
                </>
              ) : (
                <div>
                  <h2>
                    🎉
                    Application
                    Submitted!
                  </h2>
  
                  <p>
                    Your job
                    application
                    has been
                    submitted.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }