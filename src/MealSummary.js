import React, { useContext } from 'react';
import { NutritionContext } from './context/nutrition.context';
import { ShowContext } from './context/show.context';

export default function MealSummary({ name, meal, showBorderTop }) {
  const show = useContext(ShowContext);
  const allNutritions = useContext(NutritionContext);

  const mealNutritions = meal.nutritions.map(nutrition => ({
    ...nutrition,
    ...allNutritions[show.nutritionIds[nutrition.id]] //TODO: optimize
    // ...allNutritions.find(n => n.id === nutrition.id) //TODO: optimize
  }));
  const summary = mealNutritions.reduce(
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

  return (
    <>
      <div className="nutritionName">{name}</div>
      <div className="nutritionValue">{summary.energy.toFixed(1)}</div>
      <div className="nutritionValue">{summary.protein.toFixed(1)}</div>
      <div className="nutritionValue">{summary.fet.toFixed(1)}</div>
      <div className="nutritionValue">{summary.carbohydrates.toFixed(1)}</div>
      {/* extra marginRight for amount and delete icon which are not in this summary row */}
    </>
  );
}
