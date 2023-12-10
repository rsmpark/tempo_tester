import { useEffect, useRef } from "react";
import { Transition } from "react-transition-group";

import { useAppCtx } from "../../../context/hooks/useAppCtx";
import useClickListener from "../../hooks/use-click-listener";
import { duration, getTransitions } from "../../util/transition";

const getSequence = (count: number) => {
  if (count > 5 && count <= 11) {
    return 1;
  } else if (count > 11 && count <= 17) {
    return 2;
  } else if (count > 17) {
    return 3;
  }

  return 0;
};

function PracticePrompt() {
  const practiceSeqRefs = [useRef(null), useRef(null), useRef(null)];
  const { dispatch } = useAppCtx();
  const { count } = useClickListener();

  const practiceSeqs = [
    <p>tap or click to the beat</p>,
    <p>keep it up</p>,
    <p>the beat will disappear in...</p>,
  ];

  const sequence = getSequence(count);

  useEffect(() => {
    if (sequence === 3) {
      dispatch({ type: "NEXT_STAGE" });
    }
  }, [sequence, dispatch]);

  return (
    <>
      {practiceSeqs.map((practiceSeq, index) => (
        <Transition
          key={index}
          nodeRef={practiceSeqRefs[index]}
          appear={true}
          in={sequence === index}
          timeout={duration}
        >
          {(state) => (
            <div ref={practiceSeqRefs[index]} style={getTransitions(state)}>
              {practiceSeq}
            </div>
          )}
        </Transition>
      ))}
    </>
  );
}

export default PracticePrompt;
