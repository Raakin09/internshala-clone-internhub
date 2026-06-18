import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./internships.module.css";

import {
  BsGeoAlt,
  BsWallet2,
  BsCalendar,
  BsArrowUpRight,
  BsChevronRight,
} from "react-icons/bs";

const Internships = () => {
  const [internships, setInternships] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const categories = [
    "Big Brands",
    "Work From Home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
  ];

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
              data.internships.slice(0, 3)
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

  if (loading) {
    return null;
  }

  return (
    <section className={styles.container}>
      
      

      <div className={styles.categories}>
        <span className={styles.label}>
          POPULAR CATEGORIES:
        </span>

        

        {categories.map(
          (item, index) => (
            <button
              key={index}
              className={
                styles.categoryBtn
              }
            >
              {item}
            </button>
          )
        )}
        
      </div>

      <h2 className={styles.heading}>
        Latest internships on Intern Area
      </h2>

      <div className={styles.cardContainer}>
        {internships.map(
          (item) => (
            <div
              key={item._id}
              className={styles.card}
            >
              <div
                className={
                  styles.hiring
                }
              >
                <BsArrowUpRight />

                <span>
                  Actively Hiring
                </span>
              </div>

              <h3>
                {item.title ||
                  item.role ||
                  item.internshipTitle}
              </h3>

              <p
                className={
                  styles.company
                }
              >
                {item.company}
              </p>

              <div
                className={
                  styles.info
                }
              >
                <BsGeoAlt />

                <span>
                  {item.location}
                </span>
              </div>

              <div
                className={
                  styles.info
                }
              >
                <BsWallet2 />

                <span>
                  {item.stipend ||
                    item.salary ||
                    "Not specified"}
                </span>
              </div>

              <div
                className={
                  styles.info
                }
              >
                <BsCalendar />

                <span>
                  {item.duration ||
                    "Not specified"}
                </span>
              </div>

              <div
                className={
                  styles.footer
                }
              >
                <span
                  className={
                    styles.tag
                  }
                >
                  Internship
                </span>

                <Link
                  href={`/internship/${item._id}`}
                  className={
                    styles.viewBtn
                  }
                >
                  View details

                  <BsChevronRight />
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Internships;