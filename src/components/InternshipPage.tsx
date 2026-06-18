import { useState } from "react";
import styles from "./InternshipPage.module.css";
import ApplyModal from "./ApplyModal";

import {
  BsGeoAlt,
  BsWallet2,
  BsCalendar,
  BsCheckCircle,
} from "react-icons/bs";

interface InternshipProps {
  internship: {
    title: string;
    company: string;
    location: string;
    stipend: string;
    duration: string;
    aboutCompany: string;
    aboutInternship: string[];
    perks: string[];
  };
}

const InternshipPage = ({
  internship,
}: InternshipProps) => {
  const [showModal, setShowModal] =
    useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.leftSection}>
          <div className={styles.headerCard}>
            <h1 className={styles.title}>
              {internship.title}
            </h1>

            <h3 className={styles.company}>
              {internship.company}
            </h3>

            <div className={styles.details}>
              <div className={styles.detailCard}>
                <BsGeoAlt />
                <div>
                  <p>Location</p>
                  <h4>
                    {internship.location}
                  </h4>
                </div>
              </div>

              <div className={styles.detailCard}>
                <BsWallet2 />
                <div>
                  <p>Stipend</p>
                  <h4>
                    {internship.stipend}
                  </h4>
                </div>
              </div>

              <div className={styles.detailCard}>
                <BsCalendar />
                <div>
                  <p>Duration</p>
                  <h4>
                    {internship.duration}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <h2>About Company</h2>

            <p>
              {internship.aboutCompany}
            </p>
          </div>

          <div className={styles.sectionCard}>
            <h2>About Internship</h2>

            <ul>
              {internship.aboutInternship.map(
                (
                  item,
                  index
                ) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className={styles.sectionCard}>
            <h2>
              Skills Required
            </h2>

            <div className={styles.skills}>
              <span>React</span>
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>CSS</span>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <h2>
              Who Can Apply
            </h2>

            <div className={styles.rules}>
              <p>
                <BsCheckCircle />
                Available for full
                internship duration
              </p>

              <p>
                <BsCheckCircle />
                Can start immediately
              </p>

              <p>
                <BsCheckCircle />
                Relevant skills and
                interest
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.applyCard}>
            <h3>
              Internship Details
            </h3>

            <p>
              📍{" "}
              {
                internship.location
              }
            </p>

            <p>
              💰{" "}
              {
                internship.stipend
              }
            </p>

            <p>
              ⏳{" "}
              {
                internship.duration
              }
            </p>

            <button
              className={styles.applyBtn}
              onClick={() =>
                setShowModal(true)
              }
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ApplyModal
          internshipTitle={
            internship.title
          }
          company={
            internship.company
          }
          closeModal={() =>
            setShowModal(false)
          }
        />
      )}
    </div>
  );
};

export default InternshipPage;