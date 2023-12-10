import { useMetronome } from "../hooks/use-metoronome";

function Metronome() {
  const { bpm, isPlaying, count, handleToggle, handleBpmChange } = useMetronome();

  return (
    <div className="bpm-slider">
      <fieldset>
        <legend>{bpm} BPM</legend>
        <input type="range" min="40" max="240" value={bpm} onChange={handleBpmChange} />
        <button onClick={handleToggle}>{isPlaying ? "Stop" : "Start"}</button>
      </fieldset>
      <p>bpm: {bpm}</p>
      <p>count: {count}</p>
    </div>
  );
}

export default Metronome;
