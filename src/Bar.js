import React from 'react';

export default function Bar({ value1, value2 }) {
  const relation = ((value1 / value2) * 100).toFixed(0);
  const color = {
    r: Math.min((Math.abs(relation - 100) / 100) * 255, 255),
    g: Math.max(((100 - Math.abs(relation - 100)) / 100) * 255, 0),
    b: 0
  };
  return (
    <div
      style={{
        width: '100px',
        height: '1.5rem',
        backgroundColor: '#eee',
        margin: '0 0 0 1rem'
      }}
    >
      <div
        style={{
          width: relation / 2 + 'px',
          height: '1.5rem',
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b}, .2)`,
          padding: '0 0 0 1rem'
        }}
      >
        {relation}%
      </div>
    </div>
  );
}
