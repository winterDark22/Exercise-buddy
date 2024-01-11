import { useAuthContext } from "../context/AuthContext";
import { AUTH_ACTION } from "../context/AuthContext";
import { useWorkoutsContext } from "../context/WorkoutContext";
import { ACTION } from "../context/WorkoutContext";

//we have to clear the workouts in workoutsContext when user logs out. otherwise those workouts will be
// shown in the home page as a flash before fetching the new workouts for the new user who has just logged in

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: AUTH_ACTION.LOGOUT });
    dispatchWorkouts({ type: ACTION.SET_WORKOUTS, payload: null });
  };

  return { logout };
};
