import React from 'react';
import './App.css';
export default function NutritionShow({ nutrition }) {
  return (
    <>
      <div className="nutritionName">{nutrition.name}</div>
      <div className="nutritionValue">{nutrition.energy.toFixed(1)}</div>
      <div className="nutritionValue">{nutrition.protein.toFixed(1)}</div>
      <div className="nutritionValue">{nutrition.fet.toFixed(1)}</div>
      <div className="nutritionValue">{nutrition.carbohydrates.toFixed(1)}</div>
    </>
  );
}
