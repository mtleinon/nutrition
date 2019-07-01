import React, { useContext, useState } from 'react';
import { MealContext } from './context/meal.context';
import { NutritionContext } from './context/nutrition.context';
import { ShowContext } from './context/show.context';
import { MdClose } from 'react-icons/md';
import { MdSort } from 'react-icons/md';
import ReactResizeDetector from 'react-resize-detector';

import Bar from './Bar';
import IconWithTooltip from './IconWithTooltip';

export default function MealMicronutrientSummary({
  name,
  meal,
  plan,
  nutrition,
  hide
}) {
  const [wideComponent, setWideComponent] = useState(true);
  const show = useContext(ShowContext);
  const allMeals = useContext(MealContext);
  const nutritionContext = useContext(NutritionContext);
  const allNutritions = nutritionContext.nutritions;
  const nutritionInfo = nutritionContext.nutritionInfo;
  const [sortBy, setSortBy] = useState('id');

  // Fill mealNutritions array either with a single nutrition, one meals nutritions all nutritions of all meals of a plan
  let mealNutritions = [];
  if (nutrition) {
    mealNutritions[0] = nutrition;
    mealNutritions[0].amount = 100;
    name = 100 + 'g of ' + name;
  }
  if (meal) {
    mealNutritions = meal.nutritions.map(nutrition => ({
      ...nutrition,
      ...allNutritions[show.nutritionIds[nutrition.id]]
    }));
  }
  if (plan) {
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
        {wideComponent && (
          <div className="reportNumber">
            {recommendation >= 100
              ? recommendation.toFixed(0)
              : recommendation.toFixed(1)}
          </div>
        )}
        <div>
          <Bar value1={value} value2={recommendation} />
        </div>
      </>
    ) : (
      <>
        {wideComponent && <div className="reportNumber">-</div>}
        <div className="reportNumber">-</div>
      </>
    );
  };

  const microNutritionComparisonByName = (a, b) => {
    if (a.name.fi.toLowerCase() < b.name.fi.toLowerCase()) return -1;
    if (a.name.fi.toLowerCase() > b.name.fi.toLowerCase()) return 1;
    return 0;
  };
  const microNutrientComparisonById = (a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
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

  const micronutrientComparison = (a, b) => {
    switch (sortBy) {
      case 'name':
        return microNutritionComparisonByName(a, b);
      case 'recommendation':
        return microNutritionComparisonByAmountOfRecommendation(a, b);
      default:
        return microNutrientComparisonById(a, b);
    }
  };
  const onResize = width => {
    console.log(width);
    if (width < 500) {
      setWideComponent(false);
    } else {
      setWideComponent(true);
    }
  };

  return (
    <div className="report">
      <ReactResizeDetector handleWidth onResize={onResize} />
      <div className="reportHeading">
        <div className="reportHeadingRow">
          <div className="reportHeadingTitle">
            Micronutrient content of {name}
          </div>
          <div className="reportHeadingIcons">
            <IconWithTooltip tooltipText="Close report">
              <MdClose className="icon" onClick={hide} />
            </IconWithTooltip>
          </div>
        </div>
        <div
          className={`reportTableHeading reportGrid ${
            wideComponent ? 'wideReportGrid' : 'narrowReportGrid'
          }`}
        >
          <div
            className="reportNumber clickable"
            onClick={() => setSortBy('id')}
          >
            ID <MdSort className="sortIcon" />
          </div>
          <div onClick={() => setSortBy('name')} className="clickable">
            name <MdSort className="sortIcon" />
          </div>
          {wideComponent ? (
            <>
              <div className="reportNumber">Amount</div>
              <div className="reportNumber">Rec</div>
              <div
                onClick={() => setSortBy('recommendation')}
                className="reportNumber clickable"
              >
                % of Rec <MdSort className="sortIcon" />
              </div>
              <div className="reportNumber">UL</div>
            </>
          ) : (
            <>
              <div className="reportNumber">Amount</div>
              <div
                onClick={() => setSortBy('recommendation')}
                className="reportNumber clickable"
              >
                % of Rec <MdSort className="sortIcon" />
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`reportGrid ${
          wideComponent ? 'wideReportGrid' : 'narrowReportGrid'
        }`}
      >
        {nutritionInfo
          .slice(2)
          .sort(micronutrientComparison)
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
              {wideComponent && (
                <div className="reportNumber">
                  {getUpperLimit(microNutrition) &&
                    getUpperLimit(microNutrition).toFixed(0)}
                </div>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
