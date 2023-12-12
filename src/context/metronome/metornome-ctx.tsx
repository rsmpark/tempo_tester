import { FC, PropsWithChildren, createContext, useReducer } from "react";

import { Dispatch, MetronomeActions, MetronomeState } from "./metronome-ctx-config";

export const MetronomeContext = createContext<
  { state: MetronomeState; dispatch: Dispatch } | undefined
>(undefined);

const reducer = (state: MetronomeState, action: MetronomeActions) => {
  const { type } = action;

  switch (type) {
    case "SET_BPM":
      return {
        ...state,
        bpm: action.payload,
      };
    case "INC_CNT":
      return {
        ...state,
        count: (state.count + 1) % 4,
      };
    case "START":
      return {
        ...state,
        isPlaying: action.payload,
      };
    default:
      return state;
  }
};

export const MetronomeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { bpm: 1, count: 0, isPlaying: false });

  return (
    <MetronomeContext.Provider value={{ state, dispatch }}>
      {children}
    </MetronomeContext.Provider>
  );
};
