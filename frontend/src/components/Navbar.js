import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <div className={styles.navbar}>
      <header>
        <Link to="/">
          {" "}
          <h1 className={styles.h1}>Fitness buddy</h1>{" "}
        </Link>
        <nav>
          {!user && (
            <div>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>
          )}

          {user && (
            <div className={styles.actions}>
              <span> {user.email} </span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
