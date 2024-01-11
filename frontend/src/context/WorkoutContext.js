import { createContext, useContext, useReducer } from "react";

export const ACTION = {
  SET_WORKOUTS: "set-all-workouts",
  CREATE_WORKOUT: "create-new-workout",
  DELETE_WORKOUT: "delete-a-workout",
};

export const WorkoutsContext = createContext();

export function useWorkoutsContext() {
  const context = useContext(WorkoutsContext); //return a obj = { state, dispatch}

  if (!context) {
    throw Error(
      "WorkoutContext must be used inside an WorkoutsContextProvider"
    );
  }
  return context;
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTION.SET_WORKOUTS:
      return {
        //here action.payload contains a list
        workouts: action.payload,
      };
    case ACTION.CREATE_WORKOUT:
      return {
        // action.payload contains a single workout, just state.workouts dile seta list dito. [[], workout]
        // amra emn chaina, tai spread operator use korsi
        workouts: [action.payload, ...state.workouts],
      };

    case ACTION.DELETE_WORKOUT:
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
}

function WorkoutsContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    workouts: null,
  });

  return (
    // value={{...state, dispatch}} means value={{workouts: null, dispatch}}
    // value = {{workouts: state.workouts, dispatch}} means value={{workouts: null, dispatch}}

    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export default WorkoutsContextProvider;
