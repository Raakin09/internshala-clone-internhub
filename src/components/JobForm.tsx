import { useState } from "react";
import styles from "./JobForm.module.css";

export default function JobForm() {
  const [formData, setFormData] =
    useState({
      title: "",
      location: "",
      company: "",
      category: "",
      aboutCompany: "",
      aboutJob: "",
      skills: "",
      salary: "",
      experience: "",
      vacancies: "",
      applyLink: "",
      additionalInfo: "",
    });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "/api/jobs/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,
            createdAt:
              new Date(),
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        alert(
          "Job Posted Successfully!"
        );

        setFormData({
          title: "",
          location: "",
          company: "",
          category: "",
          aboutCompany: "",
          aboutJob: "",
          skills: "",
          salary: "",
          experience: "",
          vacancies: "",
          applyLink: "",
          additionalInfo: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert(
        "Failed to post job"
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Post New Job</h1>

        <p>
          Create a new job
          opportunity
        </p>

        <form
          className={styles.form}
          onSubmit={
            handleSubmit
          }
        >
          <div className={styles.row}>
            <div>
              <label>
                Job Title*
              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Frontend Developer"
              />
            </div>

            <div>
              <label>
                Location*
              </label>

              <input
                type="text"
                name="location"
                value={
                  formData.location
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Chandigarh"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>
                Company Name*
              </label>

              <input
                type="text"
                name="company"
                value={
                  formData.company
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Category*
              </label>

              <input
                type="text"
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
              />
            </div>
          </div>

          <label>
            About Company*
          </label>

          <textarea
            rows={4}
            name="aboutCompany"
            value={
              formData.aboutCompany
            }
            onChange={
              handleChange
            }
          />

          <label>
            About Job*
          </label>

          <textarea
            rows={4}
            name="aboutJob"
            value={
              formData.aboutJob
            }
            onChange={
              handleChange
            }
          />

          <div className={styles.row}>
            <div>
              <label>
                Skills Required*
              </label>

              <textarea
                rows={3}
                name="skills"
                value={
                  formData.skills
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Salary*
              </label>

              <input
                type="text"
                name="salary"
                value={
                  formData.salary
                }
                onChange={
                  handleChange
                }
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>
                Experience*
              </label>

              <input
                type="text"
                name="experience"
                value={
                  formData.experience
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Vacancies*
              </label>

              <input
                type="number"
                name="vacancies"
                value={
                  formData.vacancies
                }
                onChange={
                  handleChange
                }
              />
            </div>
          </div>

          <div>
            <label>
              Apply Link*
            </label>

            <input
              type="url"
              name="applyLink"
              value={
                formData.applyLink
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div>
            <label>
              Additional Information
            </label>

            <textarea
              rows={3}
              name="additionalInfo"
              value={
                formData.additionalInfo
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div
            className={
              styles.buttonContainer
            }
          >
            <button
              type="submit"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}