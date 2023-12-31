import { Stages } from "../../components/stages/stage.helper";
import { STAGES } from "../../components/stages/types/stage.type";

export type AppState = {
  stage: STAGES;
};

export type Dispatch = React.Dispatch<AppActions>;

export type AppActions = { type: "NEXT_STAGE" };

export const initialState = {
  metronome: { start: false, bpm: 120 },
  stage: Stages.Intro,
  start: false,
};
