import React, { useContext } from 'react';
import { NutritionContext } from './context/nutrition.context';
import { ShowDispatchContext } from './context/show.context';

export default function ShowSetNutritionCache() {
  const nutritions = useContext(NutritionContext).nutritions;
  const showDispatch = useContext(ShowDispatchContext);
  for (const [nutritionIndex, nutrition] of nutritions.entries()) {
    showDispatch({
      type: 'ADD_NUTRITION_ID',
      nutritionIndex,
      nutritionId: nutrition.id
    });
  }
  console.log('nutritions cache set');

  return <h1>SET NUTRITIONS CACHE</h1>;
}
