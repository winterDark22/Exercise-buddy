import { useRef } from "react";
import { useSignUp } from "../hooks/useSignUp";
import styles from "../components/NewWorkoutForm.module.css";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { signup, error, loading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    //console.log({ email, password });
    await signup(email, password);

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="bg-yellow-100 py-[150px]">
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.header}>Sign UP</h3>

          <div className={styles.control}>
            <label>Email: </label>
            <input type="email" ref={emailRef} />
          </div>

          <div className={styles.control}>
            <label>Password: </label>
            <input type="password" ref={passwordRef} />
          </div>

          <div className={styles.actions}>
            <button disabled={loading}>Signup</button>
          </div>

          <div>{error && <p className={styles.vul}>{error}</p>}</div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
