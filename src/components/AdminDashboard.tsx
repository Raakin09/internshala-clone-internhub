import styles from "./AdminDashboard.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const res =
            await fetch(
              "/api/admin/dashboard"
            );

          const data =
            await res.json();

          if (data.success) {
            setStats(data.stats);
          }
        } catch (error) {
          console.error(error);
        }
      };

    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      <p className={styles.subtitle}>
        Manage your jobs,
        internships and
        applications
      </p>

      <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  }}
>
  <button
    onClick={handleLogout}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>
            Total Applications
          </h3>

          <h2>
            {(stats?.internshipApplications ||
              0) +
              (stats?.jobApplications ||
                0)}
          </h2>
        </div>

        <div className={styles.statCard}>
          <h3>Active Jobs</h3>

          <h2>
            {stats?.totalJobs || 0}
          </h2>
        </div>

        <div className={styles.statCard}>
          <h3>
            Active Internships
          </h3>

          <h2>
            {stats?.totalInternships ||
              0}
          </h2>
        </div>

        <div className={styles.statCard}>
          <h3>
            Pending Applications
          </h3>

          <h2>
            {stats?.pendingApplications ||
              0}
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
      
        <div
          className={styles.card}
          onClick={() =>
            router.push(
              "/admin/applications"
            )
          }
        >
          <h2>
            View Applications
          </h2>

          <p>
            View and manage
            applications
          </p>
        </div>

       
        <div className={styles.card}>
          <h2
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              router.push(
                "/admin/jobs/create"
              )
            }
          >
            Post Job
          </h2>

          <div
            className={
              styles.innerCard
            }
            onClick={() =>
              router.push(
                "/admin/jobs"
              )
            }
          >
            <h3>
              Manage Jobs
            </h3>

            <p>
              View, delete and
              manage jobs
            </p>
          </div>

          <p>
            Create new jobs
          </p>
        </div>

        
        <div className={styles.card}>
          <h2
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              router.push(
                "/admin/internships/create"
              )
            }
          >
            Post Internship
          </h2>

          <div
            className={
              styles.innerCard
            }
            onClick={() =>
              router.push(
                "/admin/manage-internships"
              )
            }
          >
            <h3>
              Manage
              Internships
            </h3>

            <p>
              View, delete and
              manage
              internships
            </p>
          </div>

          <p>
            Create new
            internships
          </p>
        </div>

       
        <div
          className={styles.card}
          onClick={() =>
            router.push(
              "/admin/users"
            )
          }
        >
          <h2>
            Manage Users
          </h2>

          <p>
            Manage registered
            users
          </p>
        </div>

     
        <div
          className={styles.card}
          onClick={() =>
            router.push(
              "/admin/analytics"
            )
          }
        >
          <h2>Analytics</h2>

          <p>
            View reports and
            statistics
          </p>
        </div>

        
        <div
          className={styles.card}
          onClick={() =>
            router.push(
              "/admin/settings"
            )
          }
        >
          <h2>Settings</h2>

          <p>
            Configure system
            settings
          </p>
        </div>
      </div>
    </div>
  );
}