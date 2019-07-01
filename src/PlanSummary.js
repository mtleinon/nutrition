import React, { useContext } from 'react';
import { NutritionContext } from './context/nutrition.context';
import { MealContext } from './context/meal.context';
import { ShowContext } from './context/show.context';

export default function PlanSummary({ plan, showBorderTop }) {
  const show = useContext(ShowContext);
  const allNutritions = useContext(NutritionContext).nutritions;
  const allMeals = useContext(MealContext);

  const mealSummary = meal => {
    const mealNutritions = meal.nutritions.map(nutrition => ({
      ...nutrition,
      ...allNutritions[show.nutritionIds[nutrition.id]] //TODO: optimize

      // ...allNutritions.find(n => n.id === nutrition.id) //TODO: optimize
    }));
    return mealNutritions.reduce(
      (summ, cur) => {
        const res = {};
        Object.keys(summ).forEach(key => {
          res[key] = summ[key] + (cur[key] * cur.amount) / 100;
        });
        return res;
      },
      {
        energy: 0,
        carbohydrates: 0,
        fet: 0,
        protein: 0
      }
    );
  };

  const summary = plan.meals
    .map(planMeal => allMeals.find(meal => planMeal.id === meal.id))
    .map(mealSummary)
    .reduce(
      (summ, cur) => {
        const res = {};
        Object.keys(summ).forEach(key => {
          res[key] = summ[key] + cur[key];
        });
        return res;
      },
      {
        energy: 0,
        carbohydrates: 0,
        fet: 0,
        protein: 0
      }
    );
  // console.log(summary);

  return (
    <>
      <div className={`gridName ${showBorderTop ? 'borderTop boldText' : ''}`}>
        Summary
      </div>
      <div
        className={`gridNumber ${showBorderTop ? 'borderTop boldText' : ''}`}
      >
        {summary.energy.toFixed(1)}
      </div>
      <div
        className={`gridNumber ${showBorderTop ? 'borderTop boldText' : ''}`}
      >
        {summary.protein.toFixed(1)}
      </div>
      <div
        className={`gridNumber ${showBorderTop ? 'borderTop boldText' : ''}`}
      >
        {summary.fet.toFixed(1)}
      </div>
      <div
        className={`gridNumber ${showBorderTop ? 'borderTop boldText' : ''}`}
      >
        {summary.carbohydrates.toFixed(1)}
      </div>
    </>
  );
}
