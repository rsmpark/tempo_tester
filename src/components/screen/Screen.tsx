import { useEffect, useState } from "react";
import Timer from "../Timer";
import { useTimer } from "./hooks/useTimer";

const titles: string[] = ["Click to start", "Ready", "Set", "Go!"];
let clickInterval: number | undefined;

function Screen({ startGame }: { startGame: (start: boolean) => void }) {
  const { recTime, setRecTime, state, start: startTimer, reset: resetTimer } = useTimer();
  const [titleIdx, setTitleIdx] = useState(0);

  const handleClick = () => {
    if (clickInterval) {
      clearInterval(clickInterval);
      setRecTime({ second: state.second, millisecond: state.millisecond });
      resetTimer();
    }

    if (titleIdx === 0) {
      setTitleIdx(1);
    } else {
      clickInterval = startTimer();
    }
  };

  useEffect(() => {
    let titleInterval: number;

    if (titleIdx !== 0) {
      if (titleIdx < titles.length) {
        titleInterval = setTimeout(() => setTitleIdx(titleIdx + 1), 1000);
      } else {
        startGame(true);
        clickInterval = startTimer();
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
