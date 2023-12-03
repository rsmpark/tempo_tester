import { useState, useRef } from "react";

type usePractoceStageReturn = {
  practiceSeq: number;
  incrementPracticeClickCnt: () => void;
};

const usePracticeStage = (): usePractoceStageReturn => {
  const [practiceSeq, setPracticeSeq] = useState<number>(0);
  const practiceClickCnt = useRef<number>(0);

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
    practiceSeq,
    incrementPracticeClickCnt,
  };
};

export default usePracticeStage;
