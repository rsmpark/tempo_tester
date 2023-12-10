import { useContext, useEffect, useState } from "react";

import { AppContext } from "../../../context/app/app-ctx";

const CountdownPrompt = () => {
  const [count, setCount] = useState(5);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

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
