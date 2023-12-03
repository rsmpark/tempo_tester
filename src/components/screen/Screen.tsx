import { useState } from "react";

import "./Screen.css";
import Intro from "../stages/intro/Intro";
import Practice from "../stages/practice/Practice";
import { getNextStage, Stages } from "../stages/stage.helper";
import useStage from "../stages/hook/use-stage";

function Screen({ startGame }: { startGame: (start: boolean) => void }) {
  const [tapTime, setTapTime] = useState<number[]>([]);
  const { stage, setStage, practiceSeq, incrementPracticeClickCnt } = useStage();
  console.log("🚀 ~ file: Screen.tsx:57 ~ Screen ~ stage:", stage);

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
