import React from 'react';

// export default function Test(props) {
//   console.log('TEST 2', props);

//   return <span>TEST 2</span>;
// }
export default React.memo(
  function Test(props) {
    console.log('TEST', props);

    return <span>TEST</span>;
  },
  () => true
);
