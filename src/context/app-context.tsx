import { FC, PropsWithChildren, createContext, useReducer } from "react";
import { AppActions, AppState, Dispatch, initialState } from "./app-config";

const contextState = {
  appState: initialState,
  dispatch: () => {},
};

export const AppContext = createContext<{ appState: AppState; dispatch: Dispatch }>(
  contextState
);

const reducer = (state: AppState, action: AppActions) => {
  const { type } = action;

  switch (type) {
    case "SET_BPM":
      return {
        ...state,
        bpm: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ appState, dispatch }}>{children}</AppContext.Provider>
  );
};
