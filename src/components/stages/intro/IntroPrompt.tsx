import { Transition } from "react-transition-group";
import { useRef, useState } from "react";

import { defaultStyle, duration, transitionStyles } from "../../util/transition";

import { BsVolumeUp } from "react-icons/bs";
import play from "../../../assets/img/play-button.png";

function IntroPrompt({ nextStage }: { nextStage: () => void }) {
  const nodeRef = useRef(null);
  const [inProps, setInProps] = useState<boolean>(true);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setInProps(false);
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
      onExited={nextStage}
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
