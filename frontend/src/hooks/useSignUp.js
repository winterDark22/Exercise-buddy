import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import { AUTH_ACTION } from "../context/AuthContext";

export const useSignUp = () => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    seterror(null);
    setloading(true);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJSON = await response.json(); //now responeJSON is {email, token} a json obj

    if (!response.ok) {
      setloading(false);
      seterror(responseJSON.error);
    } else {
      // save the user in local storage
      localStorage.setItem("user", JSON.stringify(responseJSON)); //in json there is {email, token}. have to stringify it

      //now we have to set the auth context. in state, user:

      dispatch({ type: AUTH_ACTION.LOGIN, payload: responseJSON });

      setloading(false);
    }
  };

  return { signup, error, loading };
};
