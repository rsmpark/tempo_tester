export type AppState = {
  bpm: number;
  start: boolean;
};

export type Dispatch = React.Dispatch<AppActions>;

export type AppActions =
  | { type: "SET_BPM"; payload: number }
  | { type: "START"; payload: boolean };

export const initialState = {
  bpm: 120,
  start: false,
};
