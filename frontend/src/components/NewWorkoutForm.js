import { useRef, useState } from "react";

import styles from "./NewWorkoutForm.module.css";
import { useWorkoutsContext } from "../context/WorkoutContext";
import { ACTION } from "../context/WorkoutContext";

function NewWorkoutForm() {
  const { dispatch } = useWorkoutsContext();

  const titleRef = useRef();
  const loadRef = useRef();
  const repsRef = useRef();
  const [emptyFields, setemptyFields] = useState([]);
  const [errormsg, seterrormsg] = useState("");

  //console.log("form here", emptyFields);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const load = loadRef.current.value;
    const reps = repsRef.current.value;
    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    });

    const responseJSON = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION.CREATE_WORKOUT, payload: responseJSON });
      titleRef.current.value = "";
      loadRef.current.value = "";
      repsRef.current.value = "";
      setemptyFields([]);
      seterrormsg("");
    } else {
      // console.log("im herer");
      // console.log(responseJSON.emptyFields);
      setemptyFields(responseJSON.emptyFields);
      seterrormsg(responseJSON.error);

      //console.log(emptyFields);
    }
  };

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.header}>Add a new workout</h3>
        <div className={styles.control}>
          <label>Give a title</label>
          <input
            type="text"
            ref={titleRef}
            className={emptyFields.includes("title") ? styles.error : ""}
          />
        </div>

        <div className={styles.control}>
          <label>How many reps?</label>
          <input
            type="number"
            ref={repsRef}
            className={emptyFields.includes("reps") ? styles.error : ""}
          />
        </div>

        <div className={styles.control}>
          <label>How much load?</label>
          <input
            type="number"
            ref={loadRef}
            className={emptyFields.includes("load") ? styles.error : ""}
          />
        </div>
        <div className={styles.vul}>{errormsg && <p>{errormsg}</p>}</div>

        <div className={styles.actions}>
          <button type="submit">Add workout</button>
        </div>
      </form>
    </div>
  );
}

export default NewWorkoutForm;
