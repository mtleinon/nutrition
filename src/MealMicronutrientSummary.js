import React, { useContext } from 'react';
import { NutritionContext } from './context/nutrition.context';
import { ShowContext } from './context/show.context';
import Bar from './Bar';

export default function MealMicronutrientSummary({ name, meal, hide }) {
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

  const getRecommendation = nutritionInfo =>
    nutritionInfo &&
    nutritionInfo.recommendations &&
    nutritionInfo.recommendations[0].amounts &&
    nutritionInfo.recommendations[0].amounts[0].amount;

  const recommendationAndValue = (nutritionInfo, value) => {
    const recommendation = getRecommendation(nutritionInfo);

    return recommendation ? (
      <>
        <div className="reportNumber">
          {recommendation >= 100
            ? recommendation.toFixed(0)
            : recommendation.toFixed(1)}
        </div>
        {/* <div className="nutritionValue">
          {(recommendation > 0 ? (value / recommendation) * 100 : 0).toFixed(0)}
          %
        </div> */}
        <div>
          <Bar value1={value} value2={recommendation} />
        </div>
      </>
    ) : (
      <>
        <div className="reportNumber">-</div>
        <div className="reportNumber">-</div>
      </>
    );
  };

  const microNutritionComparison = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  };
  const microNutritionComparison2 = (a, b) => {
    const aRecommendation = getRecommendation(a);
    const bRecommendation = getRecommendation(b);
    if (aRecommendation === undefined && bRecommendation === undefined) {
      return 0;
    }
    if (aRecommendation === undefined && bRecommendation !== undefined) {
      return 1;
    }
    if (aRecommendation !== undefined && bRecommendation === undefined) {
      return -1;
    }
    const aAmountOfRecommendation = summary[a.id] / aRecommendation;
    const bAmountOfRecommendation = summary[b.id] / bRecommendation;

    return aAmountOfRecommendation - bAmountOfRecommendation;
  };

  return (
    <div className="report">
      <div className="reportHeading">
        <div className="reportHeadingRow">
          {meal.name} Micronutrient report
          <button onClick={hide}>X</button>
        </div>
        <div className="reportTableHeading reportGrid">
          <div className="reportNumber">ID</div>
          <div>name</div>
          <div className="reportNumber">Amount</div>
          <div className="reportNumber">Rec.</div>
          <div className="reportNumber">% of rec.</div>
        </div>
      </div>
      <div className="reportGrid">
        {nutritionInfo
          .slice(2)
          .sort(microNutritionComparison)
          .map(microNutrition => (
            <>
              <div className="reportNumber">{microNutrition.id}.</div>
              <div>{microNutrition.name}</div>
              <div className="reportNumber">
                {summary[microNutrition.id] >= 100
                  ? summary[microNutrition.id].toFixed(0)
                  : summary[microNutrition.id].toFixed(1)}
              </div>
              {recommendationAndValue(
                microNutrition,
                summary[microNutrition.id]
              )}
            </>
          ))}
      </div>
    </div>
  );
}
/*
<div className="reportGrid">
        {summary.sort(map((value, i) => (
          <>
            <div className="reportNumber">{i}.</div>
            <div>{nutritionInfo[i].name}</div>
            <div className="reportNumber">
              {value >= 100 ? value.toFixed(0) : value.toFixed(1)}
            </div>
            {recommendationAndValue(nutritionInfo[i], value)}
          </>
        ))}
      </div>
*/
/* <div className="report">
<div className="reportHeading">{meal.name} Micronutrient report</div>
<ul className="reportGrid">
  {summary.map((value, i) => (
    <li key={i} className="nutritionRow summaryBorder">
        {i}. {nutritionInfo[i].name}
      </div>
      <div className="nutritionValue">
        {value >= 100 ? value.toFixed(0) : value.toFixed(1)}
      </div>
      {recommendationAndValue(nutritionInfo[i], value)}
    </li>
  ))}
</ul>
</div> */
