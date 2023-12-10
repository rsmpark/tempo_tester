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
  const [state, dispatch] = useReducer(reducer, { bpm: 120, isPlaying: false });

  return (
    <MetronomeContext.Provider value={{ state, dispatch }}>
      {children}
    </MetronomeContext.Provider>
  );
};
