import { useEffect, useReducer, useState } from "react";
import Timer from "./Timer";

type State = {
  second: number;
  millisecond: number;
};

type Action = {
  type: string;
};

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

let interval: number;

function Screen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [recTime, setRecTime] = useState({ second: 0, millisecond: 0 });

  const handleClick = () => {
    if (interval) {
      clearInterval(interval);
      setRecTime({ second: state.second, millisecond: state.millisecond });
      dispatch({ type: "RESET" });
    }

    interval = setInterval(() => {
      dispatch({ type: "INC_MSEC" });
    }, 10);
  };

  useEffect(() => {
    if (state.millisecond === 100) {
      dispatch({ type: "RESET_MSEC" });
      dispatch({ type: "INC_SEC" });
    }
  }, [state.millisecond, state.second]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{ width: "600px", height: "800px", backgroundColor: "lightgrey" }}
      onClick={handleClick}
    >
      Screen
      <Timer second={state.second} millisecond={state.millisecond} recTime={recTime} />
    </div>
  );
}

export default Screen;
