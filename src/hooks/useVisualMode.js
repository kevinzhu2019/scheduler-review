import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const [replace, setReplace] = useState(false);

  function transition(newMode, replace = false) {
    if(replace) {
      setReplace(true);
    }
    setHistory(prev => ([...prev, newMode]));
    setMode(newMode);
  }

  function back() {
    if(replace) {
      setMode(history[0]);
    } else {
      setMode(history.length - 2 >= 0 ? history[history.length - 2] : history[0]);
      setHistory(prev => ([...prev.slice(0, prev.length - 1)]));
    }
  }

  return { mode: mode, transition, back };
}