import { Transition } from "react-transition-group";
import { useRef } from "react";

import { duration, getTransitions } from "../../util/transition";

function PracticePrompt({ sequence }: { sequence: number }) {
  const practiceSeqRefs = [useRef(null), useRef(null), useRef(null)];

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
