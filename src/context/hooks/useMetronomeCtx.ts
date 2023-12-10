import { useContext } from "react";

import { MetronomeContext } from "../metronome/metornome-ctx";

export const useMetronomeCtx = () => {
  const context = useContext(MetronomeContext);

  if (context === undefined) {
    throw new Error("useMetronomeContext must be used within a MetronomeProvider");
  }

  return context;
};
