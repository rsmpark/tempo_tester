import { useRef, useState } from "react";
import { BsVolumeUp } from "react-icons/bs";
import { Transition } from "react-transition-group";

import play from "../../../assets/img/play-button.png";
import { useAppCtx } from "../../../context/hooks/useAppCtx";
import { useMetronomeCtx } from "../../../context/hooks/useMetronomeCtx";
import { defaultStyle, duration, transitionStyles } from "../../util/transition";

function IntroPrompt() {
  const nodeRef = useRef(null);
  const [inProps, setInProps] = useState<boolean>(true);
  const { dispatch: appDispatch } = useAppCtx();
  const { dispatch: metronomeDispatch } = useMetronomeCtx();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setInProps(false);
  };

  const handleExited = () => {
    metronomeDispatch({ type: "START", payload: true });
    appDispatch({ type: "NEXT_STAGE" });
  };

  const introContent = (
    <>
      <h1>TEST YOUR SENSE OF TIME</h1>
      <h2>Tap along to the beat and maintain your speed</h2>

      <p>
        <BsVolumeUp />
        turn up your volume and click play to start!
      </p>
      <a onClick={handleClick}>
        <img
          className="start"
          width="140"
          height="140"
          src={play}
          alt="external-play-web-flaticons-lineal-color-flat-icons-4"
        />
      </a>
    </>
  );

  return (
    <Transition
      nodeRef={nodeRef}
      appear={true}
      in={inProps}
      timeout={duration}
      onExited={handleExited}
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {introContent}
        </div>
      )}
    </Transition>
  );
}

export default IntroPrompt;
