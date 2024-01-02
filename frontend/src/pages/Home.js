import { useEffect } from "react";
import Card from "../components/Card";
import NewWorkoutForm from "../components/NewWorkoutForm";
import styles from "../components/Card.module.css";
import { useWorkoutsContext } from "../context/WorkoutContext";
import { ACTION } from "../context/WorkoutContext";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: ACTION.SET_WORKOUTS, payload: json });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="flex justify-around bg-yellow-50 pt-14">
      <div>
        {workouts &&
          workouts.map((workout) => (
            <Card className={styles.card} key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="mx-[100px]">
        <NewWorkoutForm />
      </div>
    </div>
  );
}

export default Home;
