import React from 'react';

import Popup from 'reactjs-popup';
import PopupText from './PopupText';

// export default function IconWithTooltip({ icon, tooltipText }, props) {
export default function IconWithTooltip(props) {
  const position = props.position || 'bottom left';
  return (
    <Popup
      contentStyle={{
        backgroundColor: '#fcffba',
        width: 'auto',
        border: 'none',
        borderRadius: '3px'
      }}
      arrowStyle={{ backgroundColor: '#fcffba' }}
      trigger={props.children}
      position={position}
      on="hover"
    >
      <PopupText text={props.tooltipText} />
    </Popup>
  );
}
