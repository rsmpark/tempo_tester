import { useEffect, useRef, useState } from "react";

import { useAppCtx } from "../../../context/hooks/useAppCtx";
import { useMetronomeCtx } from "../../../context/hooks/useMetronomeCtx";

const CountdownPrompt = () => {
  const [count, setCount] = useState(7);
  const { dispatch } = useAppCtx();
  const { state } = useMetronomeCtx();
  const metronomeCnt = state.count;
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      setCount((prevCount) => prevCount - 1);
    }
    didMount.current = true;
  }, [metronomeCnt]);

  if (count === 0) {
    dispatch({ type: "NEXT_STAGE" });
  }

  return <div>{<p>{count}</p>}</div>;
};

export default CountdownPrompt;
