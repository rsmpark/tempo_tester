import { Transition } from "react-transition-group";
import { useRef } from "react";

import { defaultStyle, duration, transitionStyles } from "../../util/transition";

function Practice({ sequence }: { sequence: number }) {
  const practiceSeqRef1 = useRef(null);
  const practiceSeqRef2 = useRef(null);
  const practiceSeqRef3 = useRef(null);

  const practiceSeq1 = <p>tap or click to the beat</p>;
  const practiceSeq2 = <p>keep it up</p>;
  const practiceSeq3 = <p>the beat will disappear in...</p>;

  return (
    <>
      <Transition
        nodeRef={practiceSeqRef1}
        appear={true}
        in={sequence === 0}
        timeout={duration}
      >
        {(state) => (
          <div
            ref={practiceSeqRef1}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {practiceSeq1}
          </div>
        )}
      </Transition>
      <Transition
        nodeRef={practiceSeqRef2}
        appear={true}
        in={sequence === 1}
        timeout={duration}
      >
        {(state) => (
          <div
            ref={practiceSeqRef2}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {practiceSeq2}
          </div>
        )}
      </Transition>

      <Transition
        nodeRef={practiceSeqRef3}
        appear={true}
        in={sequence === 2}
        timeout={duration}
      >
        {(state) => (
          <div
            ref={practiceSeqRef3}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {practiceSeq3}
          </div>
        )}
      </Transition>
    </>
  );
}

export default Practice;
