import { useState, useEffect, useContext, ChangeEvent } from "react";

import click1 from "../../assets/audio/click1.wav";
import click2 from "../../assets/audio/click2.wav";
import { AppContext } from "../../context/app-context";

let timer: number | undefined;

const cl1 = new Audio(click1);
const cl2 = new Audio(click2);

export function useMetronome() {
  const { appState, dispatch } = useContext(AppContext);
  const { start, bpm } = appState.metronome;
  const [count, setCount] = useState(0);

  if (start) {
    clearInterval(timer);
    timer = setInterval(() => {
      setCount((prev) => (prev + 1) % 4);
    }, (60 / bpm) * 1000);
  }

  useEffect(() => {
    if (start) {
      if (count % 4 === 0) {
        cl1.play();
      } else {
        cl2.play();
      }
    }
  }, [count, start]);

  const handleToggle = () => {
    if (start) {
      clearInterval(timer);
      dispatch({ type: "START", payload: false });
    } else {
      dispatch({ type: "START", payload: true });
    }
  };

  const handleBpmChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  return { bpm, start, count, handleToggle, handleBpmChange };
}
