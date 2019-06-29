import React, { useContext } from 'react';
import { MealContext } from './context/meal.context';
import { NutritionContext } from './context/nutrition.context';
import { ShowContext } from './context/show.context';
import { MdClose } from 'react-icons/md';

import Bar from './Bar';
import IconWithTooltip from './IconWithTooltip';
export default function MealMicronutrientSummary({ name, meal, plan, hide }) {
  const show = useContext(ShowContext);
  const allMeals = useContext(MealContext);
  const nutritionContext = useContext(NutritionContext);
  const allNutritions = nutritionContext.nutritions;
  const nutritionInfo = nutritionContext.nutritionInfo;

  let mealNutritions;
  if (meal) {
    mealNutritions = meal.nutritions.map(nutrition => ({
      ...nutrition,
      ...allNutritions[show.nutritionIds[nutrition.id]] //TODO: optimize
      // ...allNutritions.find(n => n.id === nutrition.id) //TODO: optimize
    }));
  }
  if (plan) {
    console.log(plan);

    mealNutritions = plan.meals
      .map(meal => allMeals.find(m => m.id === meal.id).nutritions)
      .flat()
      .map(nutrition => ({
        ...nutrition,
        ...allNutritions[show.nutritionIds[nutrition.id]]
      }));
  }

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

  const getRecommendation = nutritionInfo => {
    let recommendation =
      nutritionInfo &&
      nutritionInfo.dri &&
      nutritionInfo.dri.rda &&
      nutritionInfo.dri.rda.males;
    if (recommendation) return recommendation;
    recommendation =
      nutritionInfo && nutritionInfo.dri && nutritionInfo.dri.rda;
    if (recommendation) return recommendation;
    recommendation = nutritionInfo && nutritionInfo.dri && nutritionInfo.dri.ai;
    return recommendation;
  };
  const getUpperLimit = nutritionInfo =>
    nutritionInfo && nutritionInfo.dri && nutritionInfo.dri.ul;

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

  const microNutritionComparisonByName = (a, b) => {
    // console.log(a, b);

    if (a.name.fi.toLowerCase() < b.name.fi.toLowerCase()) return -1;
    if (a.name.fi.toLowerCase() > b.name.fi.toLowerCase()) return 1;
    return 0;
  };
  const microNutritionComparisonByAmountOfRecommendation = (a, b) => {
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
          <div className="reportHeadingTitle">{name} Micronutrient Report</div>
          <div className="reportHeadingIcons">
            <IconWithTooltip tooltipText="Close report">
              <MdClose className="icon" onClick={hide} />
            </IconWithTooltip>
          </div>
        </div>
        <div className="reportTableHeading reportGrid">
          <div className="reportNumber">ID</div>
          <div>name</div>
          <div className="reportNumber">Amount</div>
          <div className="reportNumber">Rec.</div>
          <div className="reportNumber">% of rec.</div>
          <div className="reportNumber">UL</div>
        </div>
      </div>
      <div className="reportGrid">
        {nutritionInfo
          .slice(2)
          .sort(microNutritionComparisonByName)
          .map(microNutrition => (
            <React.Fragment key={microNutrition.id}>
              <div className="reportNumber">{microNutrition.id}.</div>
              <div>{microNutrition.name.fi}</div>
              <div className="reportNumber">
                {summary[microNutrition.id] >= 100
                  ? summary[microNutrition.id].toFixed(0)
                  : summary[microNutrition.id].toFixed(1)}
              </div>
              {recommendationAndValue(
                microNutrition,
                summary[microNutrition.id]
              )}
              <div className="reportNumber">
                {getUpperLimit(microNutrition) &&
                  getUpperLimit(microNutrition).toFixed(0)}
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
