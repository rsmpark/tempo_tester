import { useContext, useRef, useState } from "react";
import { BsVolumeUp } from "react-icons/bs";
import { Transition } from "react-transition-group";

import play from "../../../assets/img/play-button.png";
import { AppContext } from "../../../context/app-context";
import { defaultStyle, duration, transitionStyles } from "../../util/transition";

function IntroPrompt() {
  const nodeRef = useRef(null);
  const [inProps, setInProps] = useState<boolean>(true);
  const { dispatch } = useContext(AppContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch({ type: "START", payload: true });
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
      onExited={() => dispatch({ type: "NEXT_STAGE" })}
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
