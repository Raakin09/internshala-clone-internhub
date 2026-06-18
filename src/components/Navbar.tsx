import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

import { FcGoogle } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";

import { useAuth } from "@/context/AuthContext";

import {
  signInWithGoogle,
  logoutUser,
} from "@/firebase/auth";

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Link href="/">Intern Area</Link>
        </div>

        <div className={styles.navLinks}>
          <Link href="/internships">
            Internships
          </Link>

          <Link href="/jobs">
            Jobs
          </Link>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <BsSearch />
          </span>

          <input
            type="text"
            placeholder="Search..."
            className={styles.searchBar}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        {!user ? (
          <>
            <button
              className={styles.googleBtn}
              onClick={signInWithGoogle}
            >
              <span className={styles.googleIcon}>
                <FcGoogle />
              </span>

              Continue with Google
            </button>

            <button className={styles.registerBtn}>
              Register
            </button>

            <Link
              href="/adminpanel"
              className={styles.admin}
            >
              Admin
            </Link>
          </>
        ) : (
          <>
            <img
              src={user.photoURL || ""}
              alt="profile"
              className={styles.profilePic}
              onClick={() => router.push("/profile")}
            />

            <button
              className={styles.logoutBtn}
              onClick={logoutUser}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;