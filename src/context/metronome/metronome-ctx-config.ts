export type MetronomeState = {
  bpm: number;
  isPlaying: boolean;
};

export type Dispatch = React.Dispatch<MetronomeActions>;

export type MetronomeActions =
  | { type: "SET_BPM"; payload: number }
  | { type: "START"; payload: boolean };
