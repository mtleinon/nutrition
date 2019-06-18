import React from 'react';

import Popup from 'reactjs-popup';
import PopupText from './PopupText';

export default function PopupWithTooltip({ buttonText, onClick, tooltipText }) {
  return (
    <Popup
      contentStyle={{
        backgroundColor: '#fcffba',
        width: 'auto',
        border: 'none',
        borderRadius: '3px'
      }}
      arrowStyle={{ backgroundColor: '#fcffba' }}
      trigger={<button onClick={onClick}>{buttonText}</button>}
      position="right bottom"
      on="hover"
    >
      <PopupText text={tooltipText} />
    </Popup>
  );
}
