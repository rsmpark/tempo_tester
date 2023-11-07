const displayNum = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

type Props = {
  second: number;
  millisecond: number;
  recTime: {
    second: number;
    millisecond: number;
  };
};

function Timer({ second, millisecond, recTime }: Props) {
  return (
    <div className="timerFrame">
      <h1>
        {displayNum(second)}.<span className="ms">{displayNum(millisecond)}</span>
      </h1>
      <span className="ms">
        {displayNum(recTime.second)}.{displayNum(recTime.millisecond)}
      </span>
    </div>
  );
}

export default Timer;
