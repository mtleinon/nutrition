import { useState } from 'react';

// This hook creates a React modal. In React's documentation
// there is example that uses class based component for creating modals.
// I wanted to use hooks to implement modal and found example for that
// in the following link:
//   https://upmostly.com/tutorials/modal-components-react-custom-hooks/

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return [isShowing, toggle];
};

export default useModal;
