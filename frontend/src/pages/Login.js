import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import styles from "../components/NewWorkoutForm.module.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    //console.log({ email, password });
    await login(email, password);

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="bg-yellow-100 py-[150px]">
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.header}>Login</h3>

          <div className={styles.control}>
            <label>Email: </label>
            <input type="email" ref={emailRef} />
          </div>

          <div className={styles.control}>
            <label>Password: </label>
            <input type="password" ref={passwordRef} />
          </div>

          <div className={styles.actions}>
            <button disabled={loading}>Login</button>
          </div>

          <div>{error && <p className={styles.vul}>{error}</p>}</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
