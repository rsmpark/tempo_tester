import { useEffect, useState } from "react";

const titles: string[] = ["Click to start", "Ready", "Set", "Go!"];

function Screen({ startGame }: { startGame: (start: boolean) => void }) {
  const [titleIdx, setTitleIdx] = useState<number>(0);
  const [tapTime, setTapTime] = useState<number[]>([]);
  const [tapCount, setTapCount] = useState<number>(0);

  let titleSeqInterval: ReturnType<typeof setTimeout> | undefined;

  const startTitleSeq = () => {
    return setInterval(() => {
      setTitleIdx((prev) => prev + 1);
    }, 1000);
  };

  const handleClick = () => {
    if (titleIdx === 0) {
      setTitleIdx(1);
      titleSeqInterval = startTitleSeq();
    } else {
      setTapTime([...tapTime, Date.now()]);
    }
  };

  useEffect(() => {
    if (titleIdx === titles.length - 1) {
      startGame(true);
      clearInterval(titleSeqInterval);
    }
  }, [startGame, titleIdx, titleSeqInterval]);

  return (
    <div
      style={{ width: "600px", height: "800px", backgroundColor: "lightgrey" }}
      onClick={handleClick}
    >
      {titles[titleIdx]}
      {tapTime.map((time) => (
        <p key={time}>{time}</p>
      ))}
    </div>
  );
}

export default Screen;
