import React, { useContext } from 'react';
import finelli from './finelli5';
import { NutritionDispatchContext } from './context/nutrition.context';
// import { NutritionContext } from './context/nutrition.context';
// import { ShowDispatchContext } from './context/show.context';

export default function ReadNutritions() {
  // const nutritions = useContext(NutritionContext);
  const nutritionDispatch = useContext(NutritionDispatchContext);
  // const showDispatch = useContext(ShowDispatchContext);
  for (const [i, nutrient] of finelli.entries()) {
    // if (i > 100) {
    //   break;
    // }
    if (i > 0) {
      // console.log(nutrient);
      console.log(nutrient);
      nutritionDispatch({
        type: 'NEW',
        nutrition: {
          id: nutrient[0],
          name: nutrient[1],
          energy: +nutrient[2].replace(',', '.').replace(' ', ''),
          carbohydrates: +nutrient[3].replace(',', '.').replace(' ', ''),
          fet: +nutrient[4].replace(',', '.').replace(' ', ''),
          protein: +nutrient[5].replace(',', '.').replace(' ', '')
        }
      });
    }
  }
  console.log('Nutritions red');
  // for (const [nutritionIndex, nutrition] of nutritions.entries()) {
  //   showDispatch({
  //     type: 'ADD_NUTRITION_ID',
  //     nutritionIndex,
  //     nutritionId: nutrition.id
  //   });
  // }

  return <h1>READ NUTRITIONS</h1>;
}
