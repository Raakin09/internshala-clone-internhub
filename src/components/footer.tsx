import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <h3>Internship by places</h3>
          <p>New York</p>
          <p>Los Angeles</p>
          <p>Chicago</p>
          <p>San Francisco</p>
        </div>

        <div>
          <h3>Internship by stream</h3>
          <p>About us</p>
          <p>Careers</p>
          <p>Press</p>
        </div>

        <div>
          <h3>Job Places</h3>
          <p>Blog</p>
          <p>Newsletter</p>
          <p>Events</p>
        </div>

        <div>
          <h3>Jobs by streams</h3>
          <p>Startups</p>
          <p>Enterprise</p>
          <p>Government</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © Copyright 2026.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;