import { Transition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";

import { duration, getTransitions } from "../../util/transition";
import useClickListener from "../../hooks/use-click-listener";

const getSequence = (count: number) => {
  if (count > 5 && count <= 13) {
    return 1;
  } else if (count > 13) {
    return 2;
  }

  return 0;
};

function PracticePrompt() {
  const practiceSeqRefs = [useRef(null), useRef(null), useRef(null)];
  const { count } = useClickListener();

  const practiceSeqs = [
    <p>tap or click to the beat</p>,
    <p>keep it up</p>,
    <p>the beat will disappear in...</p>,
  ];

  return (
    <>
      {practiceSeqs.map((practiceSeq, index) => (
        <Transition
          key={index}
          nodeRef={practiceSeqRefs[index]}
          appear={true}
          in={getSequence(count) === index}
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
