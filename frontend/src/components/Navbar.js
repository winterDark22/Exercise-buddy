import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <header>
        <Link to="/">
          {" "}
          <h1 className={styles.h1}>Fitness buddy</h1>{" "}
        </Link>
      </header>
    </div>
  );
}

export default Navbar;
