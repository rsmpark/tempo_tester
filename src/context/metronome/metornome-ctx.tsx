import { FC, PropsWithChildren, createContext, useReducer } from "react";

import { Dispatch, MetronomeActions, MetronomeState } from "./metronome-ctx-config";

export const MetronomeContext = createContext<
  { state: MetronomeState; dispatch: Dispatch } | undefined
>(undefined);

const useReducerWithMiddleware = (
  reducer: (state: MetronomeState, action: MetronomeActions) => MetronomeState,
  initialState: MetronomeState,
  middlewares: ((action: MetronomeActions, state: MetronomeState) => void)[]
): [MetronomeState, Dispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("🚀 ~ file: metornome-ctx.tsx:15 ~ state:", state);

  const dispatchWithMiddleware = (action: MetronomeActions) => {
    middlewares.forEach((middleware) => middleware(action, state));
    dispatch(action);
  };

  return [state, dispatchWithMiddleware];
};

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

const logPreviousState = (action: MetronomeActions, state: MetronomeState) => {
  console.log("🚀 ~ file: metornome-ctx.tsx:49 ~ logPreviousState ~ state:", state);
};

export const MetronomeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducerWithMiddleware(
    reducer,
    {
      bpm: 120,
      count: 0,
      isPlaying: false,
    },
    [logPreviousState]
  );

  return (
    <MetronomeContext.Provider value={{ state, dispatch }}>
      {children}
    </MetronomeContext.Provider>
  );
};
