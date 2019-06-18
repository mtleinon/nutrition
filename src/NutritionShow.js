import React from 'react';
import './App.css';
export default function NutritionShow({ nutrition }) {
  // console.log(nutrition);
  return (
    <div style={{ display: 'inline-block' }}>
      <span className="nutritionName">{nutrition.name}</span>
      <span className="nutritionValue">{nutrition.energy}</span>
      <span className="nutritionValue">{nutrition.protein}</span>
      <span className="nutritionValue">{nutrition.fet}</span>
      <span className="nutritionValue">{nutrition.carbohydrates}</span>
    </div>
  );
}
