import { STAGES } from "./types/stage.type";

export const Stages = {
  Intro: "INTRO",
  Practice: "PRACTICE",
  Game: "GAME",
  Countdown: "COUNTDOWN",
  Result: "RESULT",
  Empty: "",
} as const;

export const getNextStage = (currStage: STAGES): STAGES => {
  switch (currStage) {
    case Stages.Intro:
      return Stages.Practice;
    case Stages.Practice:
      return Stages.Countdown;
    case Stages.Countdown:
      return Stages.Game;
    case Stages.Game:
      return Stages.Result;
    case Stages.Result:
      return Stages.Empty;
    default:
      return Stages.Empty;
  }
};
