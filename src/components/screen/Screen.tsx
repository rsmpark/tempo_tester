import { useState } from "react";

import "./Screen.css";
import { getNextStage, Stages } from "../stages/stage.helper";
import useStage from "../stages/hook/use-stage";
import IntroPrompt from "../stages/intro/IntroPrompt";
import PracticePrompt from "../stages/practice/PracticePrompt";

function Screen({ startGame }: { startGame: (start: boolean) => void }) {
  const [tapTime, setTapTime] = useState<number[]>([]);
  const { stage, setStage } = useStage();

  const setNextStage = () => {
    setStage(getNextStage(stage));
  };

  return (
    <>
      <div className="container">
        {stage === Stages.Intro && <IntroPrompt nextStage={setNextStage} />}
        {stage === Stages.Practice && <PracticePrompt />}
      </div>
      {tapTime.map((time) => (
        <p key={time}>{time}</p>
      ))}
    </>
  );
}

export default Screen;
