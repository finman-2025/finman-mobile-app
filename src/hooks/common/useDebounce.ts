import { useEffect, useState } from "react";

export function useDebounce(
  input: string,
  onCancel?: () => void,
  onSetDebounce?: () => void
) {
  const [debounce, setDebounce] = useState<string>();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (input !== debounce) {
        onSetDebounce && onSetDebounce();
        setDebounce(input);
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
      onCancel && onCancel();
    };
  }, [input]);

  return debounce;
}
