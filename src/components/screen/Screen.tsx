import "./Screen.css";

import { useAppCtx } from "../../context/hooks/useAppCtx";
import CountdownPrompt from "../stages/countdown/CountdownPrompt";
import IntroPrompt from "../stages/intro/IntroPrompt";
import PracticePrompt from "../stages/practice/PracticePrompt";
import { Stages } from "../stages/stage.helper";

function Screen() {
  const { state } = useAppCtx();

  return (
    <>
      <div className="container">
        {state.stage === Stages.Intro && <IntroPrompt />}
        {state.stage === Stages.Practice && <PracticePrompt />}
        {state.stage === Stages.Countdown && <CountdownPrompt />}
      </div>
      {/* {tapTime.map((time) => (
        <p key={time}>{time}</p>
      ))} */}
    </>
  );
}

export default Screen;
