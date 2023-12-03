import { useState } from "react";
import { Stages } from "../stage.helper";
import { STAGES } from "../types/stage.type";

type useStageReturn = {
  stage: STAGES;
  setStage: (stage: STAGES) => void;
};

const useStage = (): useStageReturn => {
  const [stage, setStage] = useState<STAGES>(Stages.Intro);

  return {
    stage,
    setStage,
  };
};

export default useStage;
