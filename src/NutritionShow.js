import React from 'react';
import './App.css';
export default function NutritionShow({ nutrition, wideComponent, amount }) {
  return (
    <>
      <div className="gridName">
        <div className="gridNameOverflow">{nutrition.name}</div>
      </div>
      {wideComponent && (
        <>
          <div className="gridNumber">
            {((nutrition.energy * amount) / 100).toFixed(0)}
          </div>
          <div className="gridNumber">
            {((nutrition.protein * amount) / 100).toFixed(1)}
          </div>
          <div className="gridNumber">
            {((nutrition.fet * amount) / 100).toFixed(1)}
          </div>
          <div className="gridNumber">
            {((nutrition.carbohydrates * amount) / 100).toFixed(1)}
          </div>
        </>
      )}
    </>
  );
}
