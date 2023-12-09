import { useContext } from "react";

import "./Screen.css";
import { AppContext } from "../../context/app-context";
import CountdownPrompt from "../stages/countdown/CountdownPrompt";
import IntroPrompt from "../stages/intro/IntroPrompt";
import PracticePrompt from "../stages/practice/PracticePrompt";
import { Stages } from "../stages/stage.helper";

function Screen() {
  const { appState } = useContext(AppContext);

  return (
    <>
      <div className="container">
        {appState.stage === Stages.Intro && <IntroPrompt />}
        {appState.stage === Stages.Practice && <PracticePrompt />}
        {appState.stage === Stages.Countdown && <CountdownPrompt />}
      </div>
      {/* {tapTime.map((time) => (
        <p key={time}>{time}</p>
      ))} */}
    </>
  );
}

export default Screen;
