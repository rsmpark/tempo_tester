import { ChangeEvent, useEffect, useState } from "react";
import click1 from "../assets/audio/click1.wav";
import click2 from "../assets/audio/click2.wav";

let timer: number | undefined;

const cl1 = new Audio(click1);
const cl2 = new Audio(click2);

function Metronome({ start }: { start: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    if (playing) {
      const time = Date.now();
      console.log("🚀 ~ file: Metronome.tsx:41 ~ timer=setInterval ~ time:", time);
      if (count % 4 === 0) {
        cl1.play();
      } else {
        cl2.play();
      }
    }
  }, [count, playing]);

  const handleStartStop = () => {
    if (playing) {
      //stops timer
      clearInterval(timer);
      setPlaying(false);
    } else {
      //starts timer with current bpm
      setPlaying(true);
      timer = setInterval(() => {
        setCount((prev) => (prev + 1) % 4);
      }, (60 / bpm) * 1000);
    }
  };

  const handleBpmChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    const newBpm = event.target.value;

    if (playing) {
      //stop the old timer and start a new one
      clearInterval(timer);
      timer = setInterval(() => {
        setCount((prev) => (prev + 1) % 4);
      }, (60 / +newBpm) * 1000);

      //Set the new bpm, and reset the beat counter
      setBpm(+newBpm);
    } else {
      setBpm(+newBpm);
    }
  };

  if (start) {
    handleStartStop();
  }

  return (
    <div className="bpm-slider">
      <fieldset>
        <legend>{bpm} BPM</legend>
        <input type="range" min="40" max="240" value={bpm} onChange={handleBpmChange} />
        <button onClick={handleStartStop}>{playing ? "Stop" : "Start"}</button>
      </fieldset>
      <p>bpm: {bpm}</p>
      <p>count: {count}</p>
    </div>
  );
}

export default Metronome;
