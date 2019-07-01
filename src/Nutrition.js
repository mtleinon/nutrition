import React, { useContext, useState } from 'react';
// import { NutritionDispatchContext } from './context/nutrition.context';
// import { MealDispatchContext } from './context/meal.context';
// import useModal from './modal/useModal';
import { MealContext } from './context/meal.context';
import ReactResizeDetector from 'react-resize-detector';
import NutritionRow from './NutritionRow';
import NutritionHeading from './NutritionHeading';

export default function Nutrition({ filteredNutritions, page, pageSize }) {
  const [wideComponent, setWideComponent] = useState(true);
  const meals = useContext(MealContext);

  const mealInEditMode =
    meals.length === 1 ? meals[0] : meals.find(meal => meal.editMode);

  const canNutritionBeAddedToMeal = nutritionId => {
    if (mealInEditMode) {
      if (
        !mealInEditMode.nutritions.find(
          nutritionInMeal => nutritionInMeal.id === nutritionId
        )
      ) {
        return true;
      }
    }
    return false;
  };
  const nutritionInMeal = nutritionId => {
    const meal = meals.find(meal =>
      meal.nutritions.find(nutr => nutr.id === nutritionId)
    );
    return meal ? meal.name : '';
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
    <>
      <ReactResizeDetector handleWidth onResize={onResize} />

      <div className="card">
        <div className="cardContent">
          <ul>
            <li
              className={`nutritionGrid ${
                !wideComponent ? 'narrowNutritionGrid' : ''
              }`}
            >
              <NutritionHeading wideComponent={wideComponent} />
            </li>

            {filteredNutritions
              .filter((_, i, array) => {
                return i >= (page - 1) * pageSize && i < page * pageSize;
              })
              .map(nutrition => (
                <NutritionRow
                  key={nutrition.id}
                  nutrition={nutrition}
                  mealInEditMode={mealInEditMode !== undefined}
                  canNutritionBeAddedToMeal={canNutritionBeAddedToMeal(
                    nutrition.id
                  )}
                  nutritionInMeal={nutritionInMeal(nutrition.id)}
                  wideComponent={wideComponent}
                />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
