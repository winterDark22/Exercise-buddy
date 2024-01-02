import { useWorkoutsContext, ACTION } from "../context/WorkoutContext";

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Card = (props) => {
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + props.workout._id, {
      method: "DELETE",
    });

    const responseJSON = await response.json();

    console.log(responseJSON);

    if (response.ok) {
      dispatch({ type: ACTION.DELETE_WORKOUT, payload: responseJSON });
    }
  };

  return (
    <div className={props.className}>
      <div className="px-28 text-lg">
        <h1>TITLE: {props.workout.title}</h1>
        <h3>REPS: {props.workout.reps}</h3>
        <h3>LOAD: {props.workout.load}</h3>
        <p>
          {formatDistanceToNow(new Date(props.workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        {/* <p> id: {props.workout._id}</p> */}

        <div className="ps-80">
          <span className="material-symbols-outlined" onClick={handleDelete}>
            delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

//this is also another way to access object
// {Object.keys(props.workout).map((key) => (
//   <div key={key} className="my-3">
//     <strong>{key}:</strong> {JSON.stringify(props.workout[key])}
//   </div>
// ))}
