import { useState } from "react";

import Metronome from "./components/Metronome";
import Screen from "./components/screen/Screen";

function App() {
  const [start, setStart] = useState(false);
  return (
    <>
      <Screen />
      <Metronome start={start} />
    </>
  );
}

export default App;
