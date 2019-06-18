import { useReducer, useEffect } from 'react';

export default function useLocalStorageReducer(key, reducer, initialValue) {
  const [state, dispatch] = useReducer(reducer, initialValue, () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });
  useEffect(() =>
    window.localStorage.setItem(key, JSON.stringify(state), [state])
  );
  return [state, dispatch];
}
