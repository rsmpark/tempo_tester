import { Stages } from "../components/stages/stage.helper";
import { STAGES } from "../components/stages/types/stage.type";

export type AppState = {
  bpm: number;
  stage: STAGES;
  start: boolean;
};

export type Dispatch = React.Dispatch<AppActions>;

export type AppActions =
  | { type: "SET_BPM"; payload: number }
  | { type: "NEXT_STAGE" }
  | { type: "START"; payload: boolean };

export const initialState = {
  bpm: 120,
  stage: Stages.Intro,
  start: false,
};
