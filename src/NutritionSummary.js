import React, { useContext } from 'react';
import { NutritionContext } from './context/nutrition.context';
import { ShowContext } from './context/show.context';

export default function NutritionSummary({ name, meal, showBorderTop }) {
  const show = useContext(ShowContext);
  const nutritionContext = useContext(NutritionContext);
  const allNutritions = nutritionContext.nutritions;
  const nutritionInfo = nutritionContext.nutritionInfo;
  const mealNutritions = meal.nutritions.map(nutrition => ({
    ...nutrition,
    ...allNutritions[show.nutritionIds[nutrition.id]] //TODO: optimize
    // ...allNutritions.find(n => n.id === nutrition.id) //TODO: optimize
  }));

  // nutrition summary contains the properties which summ is calculated with reduce
  // Two first properties containing "id" and "name" are removed from the object before
  // calculation.
  // const nutritionSummary = Object.assign({}, nutritionContext.nutritionInfo);
  console.log(meal);
  console.log(mealNutritions);

  const summaryInit = [];
  nutritionInfo.forEach(info => {
    summaryInit[info.id] = 0;
  });

  console.log(summaryInit);
  const summary = mealNutritions.reduce((summ, cur) => {
    const res = [];
    summ.forEach((id, i) => {
      if (i > 1) {
        res[i] = summ[i] + (cur[i] * cur.amount) / 100;
      }
    });
    return res;
  }, summaryInit);
  console.log(summary);

  // If recommendation exists for the micronutrient, return
  // value, micronutrient recommentation and value % of recommendation
  // otherwise return value and two 0's.
  const recommendationAndValue = (nutritionInfo, value) => {
    const recommendation =
      nutritionInfo &&
      nutritionInfo.recommendations &&
      nutritionInfo.recommendations[0].amounts &&
      nutritionInfo.recommendations[0].amounts[0].amount;

    return recommendation ? (
      <>
        <div className="nutritionValue">
          {recommendation >= 100
            ? recommendation.toFixed(0)
            : recommendation.toFixed(1)}
        </div>
        <div className="nutritionValue">
          {(recommendation > 0 ? (value / recommendation) * 100 : 0).toFixed(0)}
          %
        </div>
      </>
    ) : (
      <>
        <div className="nutritionValue">-</div>
        <div className="nutritionValue">-</div>
      </>
    );
  };

  return (
    <div>
      <ul>
        {summary.map((value, i) => (
          <li key={i} className="nutritionRow summaryBorder">
            <div className="nutritionName">
              {i}. {nutritionInfo[i].name}
            </div>
            <div className="nutritionValue">
              {value >= 100 ? value.toFixed(0) : value.toFixed(1)}
            </div>
            {recommendationAndValue(nutritionInfo[i], value)}
          </li>
        ))}
      </ul>
    </div>
  );
}
