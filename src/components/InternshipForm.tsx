import { useState } from "react";
import styles from "./InternshipForm.module.css";

export default function InternshipForm() {
  const [formData, setFormData] =
    useState({
      title: "",
      location: "",
      company: "",
      category: "",
      aboutCompany: "",
      aboutInternship: "",
      whoCanApply: "",
      perks: "",
      openings: "",
      stipend: "",
      startDate: "",
      additionalInfo: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
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

    setLoading(true);

    try {
      const res = await fetch(
        "/api/internships/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        setSuccess(true);

        setFormData({
          title: "",
          location: "",
          company: "",
          category: "",
          aboutCompany: "",
          aboutInternship: "",
          whoCanApply: "",
          perks: "",
          openings: "",
          stipend: "",
          startDate: "",
          additionalInfo: "",
        });
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create internship"
      );
    }

    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>
          Post New Internship
        </h1>

        <p>
          Create a new internship
          opportunity for students
        </p>

        {success && (
          <p>
            ✅ Internship posted
            successfully
          </p>
        )}

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.row}>
            <div>
              <label>Title*</label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
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
            About Internship*
          </label>

          <textarea
            rows={4}
            name="aboutInternship"
            value={
              formData.aboutInternship
            }
            onChange={
              handleChange
            }
          />

          <div className={styles.row}>
            <div>
              <label>
                Who Can Apply*
              </label>

              <textarea
                rows={3}
                name="whoCanApply"
                value={
                  formData.whoCanApply
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Perks*
              </label>

              <textarea
                rows={3}
                name="perks"
                value={
                  formData.perks
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
                Number Of
                Openings*
              </label>

              <input
                type="number"
                name="openings"
                value={
                  formData.openings
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Stipend*
              </label>

              <input
                type="text"
                name="stipend"
                value={
                  formData.stipend
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
                Start Date*
              </label>

              <input
                type="date"
                name="startDate"
                value={
                  formData.startDate
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div>
              <label>
                Additional
                Information*
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
          </div>

          <div
            className={
              styles.buttonContainer
            }
          >
            <button
              type="submit"
            >
              {loading
                ? "Posting..."
                : "Post Internship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}