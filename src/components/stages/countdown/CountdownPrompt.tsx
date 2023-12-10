import { useEffect, useState } from "react";

import { useAppCtx } from "../../../context/hooks/useAppCtx";
import { useMetronomeCtx } from "../../../context/hooks/useMetronomeCtx";
import { getTimeoutDuration } from "../../metronome/metronome-util";

const CountdownPrompt = () => {
  const [count, setCount] = useState(5);
  const { dispatch } = useAppCtx();
  const { state } = useMetronomeCtx();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, getTimeoutDuration(state.bpm));

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (count === 0) {
    dispatch({ type: "NEXT_STAGE" });
  }

  return (
    <div>
      <p>{count}</p>
    </div>
  );
};

export default CountdownPrompt;
