import React from 'react';

export default function NutritionHeading({ wideComponent }) {
  return (
    <>
      <div className="gridName borderBottom boldText">Name</div>
      {wideComponent && (
        <>
          <div className="gridNumber borderBottom boldText">Energy</div>
          <div className="gridNumber borderBottom boldText">Prot</div>
          <div className="gridNumber borderBottom boldText">Fet</div>
          <div className="gridNumber borderBottom boldText">Carb</div>
        </>
      )}
    </>
  );
}
