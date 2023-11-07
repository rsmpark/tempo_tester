import { useEffect, useReducer, useState } from "react";
import { Action, State } from "./Types";

const DELAY = 10;

const initialState = { second: 0, millisecond: 0 };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INC_SEC": {
      return { ...state, second: state.second + 1 };
    }
    case "INC_MSEC": {
      return { ...state, millisecond: state.millisecond + 1 };
    }
    case "RESET_MSEC": {
      return { ...state, millisecond: 0 };
    }
    case "RESET": {
      return initialState;
    }
  }
  throw Error("Unknown action: " + action.type);
};

export const useTimer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [recTime, setRecTime] = useState({ second: 0, millisecond: 0 });

  useEffect(() => {
    if (state.millisecond === 100) {
      dispatch({ type: "RESET_MSEC" });
      dispatch({ type: "INC_SEC" });
    }
  }, [state.millisecond, state.second]);

  const start = () => {
    return setInterval(() => {
      dispatch({ type: "INC_MSEC" });
    }, DELAY);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return { recTime, setRecTime, state, start, reset };
};
