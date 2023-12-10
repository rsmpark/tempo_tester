import { useContext } from "react";

import { AppContext } from "../app/app-ctx";

export const useAppCtx = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
