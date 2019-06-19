import React from 'react';

export default function NutritionHeading({ printAmount }) {
  return (
    <div className="nutritionHeading">
      <span className="nutritionName">Name</span>
      <span className="nutritionValue">Energy</span>
      <span className="nutritionValue">Prot</span>
      <span className="nutritionValue">Fet</span>
      <span className="nutritionValue">Carb</span>
      {printAmount && <span className="nutritionValue">Amo</span>}
      {/* Extra marginRight for delete icon which is not in heading row */}
    </div>
  );
}
