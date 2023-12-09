import { useState, useEffect, useRef } from "react";

function useClickListener() {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(0);
  const hookRef = useRef(false);

  const handleClick = (event: MouseEvent) => {
    setClickCoordinates({ x: event.clientX, y: event.clientY });
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (hookRef.current) {
      document.addEventListener("click", handleClick);
    }

    hookRef.current = true;
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return { clickCoordinates, count };
}

export default useClickListener;
