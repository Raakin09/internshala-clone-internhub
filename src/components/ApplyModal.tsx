import { useState } from "react";
import styles from "./ApplyModal.module.css";

import { useAuth } from "@/context/AuthContext";

interface ApplyModalProps {
  closeModal: () => void;

  internshipTitle: string;

  company: string;
}

const ApplyModal = ({
  closeModal,
  internshipTitle,
  company,
}: ApplyModalProps) => {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [formData, setFormData] =
    useState({
      phone: "",
      resume: "",
      coverLetter: "",
    });

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

    if (!user) {
      alert(
        "Please login before applying."
      );

      return;
    }

    if (
      !formData.phone ||
      !formData.resume
    ) {
      alert(
        "Please fill all required fields."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/applications/create",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              internshipTitle,

              company,

              applicantId:
                user.uid,

              applicantName:
                user.displayName,

              applicantEmail:
                user.email,

              phone:
                formData.phone,

              resume:
                formData.resume,

              coverLetter:
                formData.coverLetter,
            }),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        setSuccess(true);

        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        alert(
          "Failed to submit application."
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={
            styles.closeBtn
          }
          onClick={closeModal}
        >
          ×
        </button>

        {!success ? (
          <>
            <h2>
              Apply for Internship
            </h2>

            <form
              className={
                styles.form
              }
              onSubmit={
                handleSubmit
              }
            >
              <input
                type="text"
                value={
                  user?.displayName ||
                  ""
                }
                disabled
                placeholder="Name"
              />

              <input
                type="email"
                value={
                  user?.email || ""
                }
                disabled
                placeholder="Email"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="resume"
                placeholder="Resume Link"
                value={
                  formData.resume
                }
                onChange={
                  handleChange
                }
              />

              <textarea
                rows={5}
                name="coverLetter"
                placeholder="Cover Letter"
                value={
                  formData.coverLetter
                }
                onChange={
                  handleChange
                }
              />

              <button
                type="submit"
                className={
                  styles.submitBtn
                }
                disabled={
                  loading
                }
              >
                {loading
                  ? "Submitting..."
                  : "Submit Application"}
              </button>
            </form>
          </>
        ) : (
          <div
            className={
              styles.successBox
            }
          >
            <h2>
              🎉 Application
              Submitted!
            </h2>

            <p>
              Your application
              has been submitted
              successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;