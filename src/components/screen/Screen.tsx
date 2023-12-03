import { useState } from "react";

import "./Screen.css";
import Intro from "../stages/intro/Intro";
import Practice from "../stages/practice/Practice";
import { getNextStage, Stages } from "../stages/stage.helper";
import useStage from "../stages/hook/use-stage";
import usePracticeStage from "../stages/hook/use-practice-stage";

function Screen({ startGame }: { startGame: (start: boolean) => void }) {
  const [tapTime, setTapTime] = useState<number[]>([]);
  const { stage, setStage } = useStage();
  const { practiceSeq, incrementPracticeClickCnt } = usePracticeStage();

  const handleScreenClick = () => {
    incrementPracticeClickCnt();
  };

  const setNextStage = () => {
    setStage(getNextStage(stage));
  };

  return (
    <>
      <div className="container" onClick={handleScreenClick}>
        {stage === Stages.Intro && <Intro nextStage={setNextStage} />}
        {stage === Stages.Practice && <Practice sequence={practiceSeq} />}
      </div>
      {tapTime.map((time) => (
        <p key={time}>{time}</p>
      ))}
    </>
  );
}

export default Screen;
