import { useEffect, ChangeEvent } from "react";

import click1 from "../../assets/audio/click1.wav";
import click2 from "../../assets/audio/click2.wav";
import { useMetronomeCtx } from "../../context/hooks/useMetronomeCtx";
import { getTimeoutDuration } from "../metronome/metronome-util";

let timer: number | undefined;

const cl1 = new Audio(click1);
const cl2 = new Audio(click2);

export function useMetronome() {
  const { state, dispatch } = useMetronomeCtx();
  const { bpm, isPlaying, count } = state;

  if (isPlaying && !timer) {
    timer = setInterval(() => {
      dispatch({ type: "INC_CNT" });
    }, getTimeoutDuration(bpm));
  }

  useEffect(() => {
    if (isPlaying) {
      if (count % 4 === 0) {
        cl1.play();
      } else {
        cl2.play();
      }
    }
  }, [count, isPlaying]);

  const handleToggle = () => {
    if (isPlaying) {
      clearInterval(timer);
      timer = undefined;
      dispatch({ type: "START", payload: false });
    } else {
      dispatch({ type: "START", payload: true });
    }
  };

  const handleBpmChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newBpm = event.target.value;
    if (isPlaying) {
      //stop the old timer and isPlaying a new one
      clearInterval(timer);
      timer = setInterval(() => {
        dispatch({ type: "INC_CNT" });
      }, getTimeoutDuration(+newBpm));

      //Set the new bpm, and reset the beat counter
      dispatch({ type: "SET_BPM", payload: +newBpm });
    } else {
      dispatch({ type: "SET_BPM", payload: +newBpm });
    }
  };

  return { bpm, isPlaying, count, handleToggle, handleBpmChange };
}
