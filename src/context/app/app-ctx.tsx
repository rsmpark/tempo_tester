import { FC, PropsWithChildren, createContext, useReducer } from "react";

import { AppActions, AppState, Dispatch, initialState } from "./app-config";
import { getNextStage } from "../../components/stages/stage.helper";

export const AppContext = createContext<
  { state: AppState; dispatch: Dispatch } | undefined
>(undefined);

const reducer = (state: AppState, action: AppActions) => {
  const { type } = action;

  switch (type) {
    case "NEXT_STAGE":
      return {
        ...state,
        stage: getNextStage(state.stage),
      };
    default:
      return state;
  }
};

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  );
};
