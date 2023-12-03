import { useState, useRef } from "react";
import { Stages } from "../stage.helper";
import { STAGES } from "../types/stage.type";

type useStageReturn = {
  stage: STAGES;
  setStage: (stage: STAGES) => void;
  practiceSeq: number;
  practiceClickCnt: number;
  incrementPracticeClickCnt: () => void;
};

const useStage = (): useStageReturn => {
  const [stage, setStage] = useState<STAGES>(Stages.Intro);
  const [practiceSeq, setPracticeSeq] = useState<number>(0);
  const practiceClickCnt = useRef<number>(0);

  console.log("useStage");

  const incrementPracticeClickCnt = () => {
    practiceClickCnt.current += 1;

    const currCount = practiceClickCnt.current;
    console.log(
      "🚀 ~ file: use-stage.ts:21 ~ incrementPracticeClickCnt ~ currCount:",
      currCount
    );

    if (currCount > 5 && currCount <= 13) {
      setPracticeSeq(1);
    } else if (currCount > 13) {
      setPracticeSeq(2);
    }
  };

  return {
    stage,
    setStage,
    practiceSeq,
    practiceClickCnt: practiceClickCnt.current,
    incrementPracticeClickCnt,
  };
};

export default useStage;
