import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import InternshipPage from "@/components/InternshipPage";

export default function Internship() {
  const router = useRouter();

  const { id } = router.query;

  const [internship, setInternship] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchInternship =
      async () => {
        try {
          const res = await fetch(
            `/api/internships/${id}`
          );

          const data =
            await res.json();

          console.log(
            "INTERNSHIP DATA:",
            data
          );

          if (data.success) {
            const internshipData =
              data.internship;

            console.log(
              "DOCUMENT:",
              internshipData
            );

            setInternship({
              title:
                internshipData.title ||
                internshipData.role ||
                internshipData.internshipTitle ||
                "Untitled Internship",

              company:
                internshipData.company ||
                "Company Not Available",

              location:
                internshipData.location ||
                "Location Not Available",

              stipend:
                internshipData.stipend ||
                internshipData.salary ||
                "Not specified",

              duration:
                internshipData.duration ||
                internshipData.startDate ||
                "Not specified",

              aboutCompany:
                internshipData.aboutCompany ||
                "",

              aboutInternship:
                internshipData.aboutInternship
                  ? internshipData.aboutInternship.split(
                      "\n"
                    )
                  : [],

              perks:
                internshipData.perks
                  ? internshipData.perks.split(
                      "\n"
                    )
                  : [],
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchInternship();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <h2
          style={{
            textAlign:
              "center",
            marginTop: "50px",
          }}
        >
          Loading...
        </h2>

        <Footer />
      </>
    );
  }

  if (!internship) {
    return (
      <>
        <Navbar />

        <h2
          style={{
            textAlign:
              "center",
            marginTop: "50px",
          }}
        >
          Internship Not Found
        </h2>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <InternshipPage
        internship={internship}
      />

      <Footer />
    </>
  );
}