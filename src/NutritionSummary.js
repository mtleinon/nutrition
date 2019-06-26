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

  // const nutritionSummary = {};
  // Object.keys(nutritionInfo).forEach((key, i) => {
  //   if (i > 1) {
  //     nutritionSummary[key.toString()] = 0;
  //   }
  // });
  // console.log(summaryInit);
  // const summary = mealNutritions.reduce((summ, cur) => {
  //   const res = {};
  //   Object.keys(summ).forEach(key => {
  //     res[key] = summ[key] + (cur[key] * cur.amount) / 100;
  //   });
  //   return res;
  // }, summaryInit);

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

  return (
    <div>
      <ul>
        {summary.map((value, i) => (
          <li key={i} className="nutritionRow summaryBorder">
            <div className="nutritionName">
              {i}. {nutritionInfo[i].name}
            </div>
            <div className="nutritionValue">{value.toFixed(1)}</div>
            {nutritionInfo[i] &&
            nutritionInfo[i].recommendations &&
            nutritionInfo[i].recommendations[0].amounts ? (
              <>
                <div className="nutritionValue">
                  {nutritionInfo[
                    i
                  ].recommendations[0].amounts[0].amount.toFixed(1)}
                </div>
                <div className="nutritionValue">
                  {(nutritionInfo[i].recommendations[0].amounts[0].amount > 0
                    ? (value /
                        nutritionInfo[i].recommendations[0].amounts[0].amount) *
                      100
                    : 0
                  ).toFixed(0)}
                  %
                </div>
              </>
            ) : (
              <>
                <div className="nutritionValue">0</div>
                <div className="nutritionValue">0</div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    // <>
    //   <div className="nutritionName">{name}</div>
    //   <div className="nutritionValue">{summary.energy.toFixed(1)}</div>
    //   <div className="nutritionValue">{summary.protein.toFixed(1)}</div>
    //   <div className="nutritionValue">{summary.fet.toFixed(1)}</div>
    //   <div className="nutritionValue">{summary.carbohydrates.toFixed(1)}</div>
    //   {/* extra marginRight for amount and delete icon which are not in this summary row */}
    // </>
  );
}
