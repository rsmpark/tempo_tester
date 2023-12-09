import { ChangeEvent, useContext, useEffect, useState } from "react";

import click1 from "../../assets/audio/click1.wav";
import click2 from "../../assets/audio/click2.wav";
import { AppContext } from "../../context/app-context";

let timer: number | undefined;

const cl1 = new Audio(click1);
const cl2 = new Audio(click2);

function Metronome() {
  const { appState, dispatch } = useContext(AppContext);
  const { start, bpm } = appState.metronome;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (start) {
      if (count % 4 === 0) {
        cl1.play();
      } else {
        cl2.play();
      }
    }
  }, [count, start]);

  const handleStartStop = () => {
    if (start) {
      //stops timer
      clearInterval(timer);
      dispatch({ type: "START", payload: false });
    } else {
      //starts timer with current bpm
      dispatch({ type: "START", payload: true });
      timer = setInterval(() => {
        setCount((prev) => (prev + 1) % 4);
      }, (60 / bpm) * 1000);
    }
  };

  const handleBpmChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    const newBpm = event.target.value;
    if (start) {
      //stop the old timer and start a new one
      clearInterval(timer);
      timer = setInterval(() => {
        setCount((prev) => (prev + 1) % 4);
      }, (60 / +newBpm) * 1000);

      //Set the new bpm, and reset the beat counter
      dispatch({ type: "SET_BPM", payload: +newBpm });
    } else {
      dispatch({ type: "SET_BPM", payload: +newBpm });
    }
  };

  return (
    <div className="bpm-slider">
      <fieldset>
        <legend>{bpm} BPM</legend>
        <input type="range" min="40" max="240" value={bpm} onChange={handleBpmChange} />
        <button onClick={handleStartStop}>{start ? "Stop" : "Start"}</button>
      </fieldset>
      <p>bpm: {bpm}</p>
      <p>count: {count}</p>
    </div>
  );
}

export default Metronome;
