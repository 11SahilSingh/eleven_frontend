import { useEffect, useState } from "react";

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
};

// useState that is saved to localStorage so data survives a page refresh.
export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => read(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be full or blocked (private mode); the app still works in memory.
    }
  }, [key, value]);

  return [value, setValue];
}
