export type TimerState = {
  second: number;
  millisecond: number;
};

export type Action = {
  type: string;
  payload?: any;
};
