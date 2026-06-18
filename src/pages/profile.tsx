import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import styles from "@/styles/Profile.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.banner}></div>

          <img
  src={user?.photoURL || "/profile.png"}
  alt="Profile"
  className={styles.avatar}
/>

          <h1>{user?.name}</h1>

          <p>{user?.email}</p>

          <div className={styles.stats}>
            <div className={styles.statBox}>
              <h2>0</h2>
              <span>Active Applications</span>
            </div>

            <div className={styles.statBoxGreen}>
              <h2>0</h2>
              <span>Accepted Applications</span>
            </div>
          </div>

          <button
            className={styles.button}
            onClick={() =>
              router.push("/userapplication")
            }
          >
            View Applications
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}