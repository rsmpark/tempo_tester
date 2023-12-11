export type MetronomeState = {
  bpm: number;
  isPlaying: boolean;
  count: number;
};

export type Dispatch = React.Dispatch<MetronomeActions>;

export type MetronomeActions =
  | { type: "SET_BPM"; payload: number }
  | { type: "INC_CNT" }
  | { type: "START"; payload: boolean };
