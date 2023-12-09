import { useContext } from "react";

import "./Screen.css";
import { Stages } from "../stages/stage.helper";
import IntroPrompt from "../stages/intro/IntroPrompt";
import PracticePrompt from "../stages/practice/PracticePrompt";
import { AppContext } from "../../context/app-context";

function Screen() {
  const { appState } = useContext(AppContext);

  return (
    <>
      <div className="container">
        {appState.stage === Stages.Intro && <IntroPrompt />}
        {appState.stage === Stages.Practice && <PracticePrompt />}
      </div>
      {/* {tapTime.map((time) => (
        <p key={time}>{time}</p>
      ))} */}
    </>
  );
}

export default Screen;
