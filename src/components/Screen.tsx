import { useEffect, useReducer, useState } from "react";
import Timer from "./Timer";

type State = {
  second: number;
  millisecond: number;
};

type Action = {
  type: string;
};

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

let clickInterval: number;
const titles: string[] = ["Click to start", "Ready", "Set", "Go!"];

function Screen({ onGameStart }: { onGameStart: (start: boolean) => void }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [recTime, setRecTime] = useState({ second: 0, millisecond: 0 });
  const [titleIdx, setTitleIdx] = useState(0);

  const handleClick = () => {
    if (clickInterval) {
      clearInterval(clickInterval);
      setRecTime({ second: state.second, millisecond: state.millisecond });
      dispatch({ type: "RESET" });
    }

    if (titleIdx === 0) {
      setTitleIdx(1);
    } else {
      clickInterval = setInterval(() => {
        dispatch({ type: "INC_MSEC" });
      }, DELAY);
    }
  };

  useEffect(() => {
    if (state.millisecond === 100) {
      dispatch({ type: "RESET_MSEC" });
      dispatch({ type: "INC_SEC" });
    }
  }, [state.millisecond, state.second]);

  useEffect(() => {
    let titleInterval: number;

    if (titleIdx !== 0) {
      if (titleIdx < titles.length) {
        titleInterval = setTimeout(() => setTitleIdx(titleIdx + 1), 1000);
      } else {
        onGameStart(true);
        clickInterval = setInterval(() => {
          dispatch({ type: "INC_MSEC" });
        }, DELAY);
      }
    }
    return () => {
      clearInterval(titleInterval);
    };
  }, [titleIdx]);

  useEffect(() => {
    return () => {
      clearInterval(clickInterval);
    };
  }, []);

  return (
    <div
      style={{ width: "600px", height: "800px", backgroundColor: "lightgrey" }}
      onClick={handleClick}
    >
      {titles[titleIdx]}
      <Timer second={state.second} millisecond={state.millisecond} recTime={recTime} />
    </div>
  );
}

export default Screen;
