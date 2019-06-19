import React, { useState } from 'react';
import IconWithTooltip from './IconWithTooltip';
export default function EditableValue({
  initialValue,
  name,
  updateValue,
  width,
  type,
  tooltip,
  className
}) {
  const [value, setValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);
  width = width === undefined ? '5rem' : width;
  type = type === undefined ? 'text' : type;
  className = className === undefined ? 'nutritionValue' : className;

  const keyPress = e => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      setEditMode(false);
      if (type === 'number') {
        updateValue(name, +value);
      } else {
        updateValue(name, value);
      }
    } else if (e.keyCode === 27) {
      setEditMode(false);
      setValue(initialValue);
    }
    //e.preventDefault();
  };
  const lostFocus = e => {
    console.log(e);
    setEditMode(false);
    if (type === 'number') {
      updateValue(name, +value);
    } else {
      updateValue(name, value);
    }
  };

  const showValue = () => (
    <div
      className={className}
      tabIndex="0"
      style={{
        // display: 'block',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        // display: 'inline-block',
        textAlign: type === 'number' ? 'right' : 'left',
        // width,
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
      onClick={() => setEditMode(true)}
    >
      {type === 'number' ? (+value).toFixed(1) : value}
    </div>
  );

  return editMode ? (
    <input
      className={className}
      autoFocus
      tabIndex="0"
      type={type}
      style={{
        fontFamily: 'inherit',
        fontSize: 'inherit',
        width,
        border: 'none',
        backgroundColor: '#eee',
        textAlign: type === 'number' ? 'right' : 'left',

        outline: 'none'
      }}
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={lostFocus}
      onKeyUp={keyPress}
    />
  ) : (
    <IconWithTooltip tooltipText={tooltip} position="right center">
      {showValue}
    </IconWithTooltip>
  );
}
