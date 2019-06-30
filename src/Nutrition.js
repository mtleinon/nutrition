import React, { useContext } from 'react';
import { NutritionDispatchContext } from './context/nutrition.context';
import { MealDispatchContext } from './context/meal.context';
import NutritionEditable from './NutritionEditable';
// import { MealContext } from './context/meal.context';
import IconWithTooltip from './IconWithTooltip';
import { MdAddCircle } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdAssignment } from 'react-icons/md';
import useModal from './modal/useModal';
import Modal from './modal/Modal';
import MealMicronutrientSummary from './MealMicronutrientSummary';

// import Test from './Test';
const Nutrition = ({
  nutrition,
  mealInEditMode,
  canNutritionBeAddedToMeal,
  nutritionInMeal
}) => {
  const nutritionDispatch = useContext(NutritionDispatchContext);
  const mealDispatch = useContext(MealDispatchContext);
  const [showReport, toggleShowReport] = useModal();

  const addNutritionToMeal = () => {
    if (canNutritionBeAddedToMeal) {
      mealDispatch({
        type: 'ADD_NUTRITION',
        nutrition: {
          id: nutrition.id,
          amount: 0
        }
      });
    }
  };

  return (
    <>
      <Modal isShowing={showReport} hide={toggleShowReport}>
        <MealMicronutrientSummary
          nutrition={nutrition}
          name={nutrition.name}
          hide={toggleShowReport}
        />
      </Modal>

      <li key={nutrition.id}>
        <div className="nutritionRow">
          <NutritionEditable nutrition={nutrition} />
          <div className="icons">
            <IconWithTooltip
              position="right center"
              tooltipText={
                !mealInEditMode
                  ? 'Set a meal in edit mode before adding nutrients'
                  : canNutritionBeAddedToMeal
                  ? 'Add nutrition to meal'
                  : 'Nutrition is already in the meal'
              }
            >
              <MdAddCircle
                className="icon"
                style={{
                  color: canNutritionBeAddedToMeal ? 'green' : 'grey'
                }}
                onClick={addNutritionToMeal}
              />
            </IconWithTooltip>

            <IconWithTooltip
              position="right center"
              tooltipText={
                nutritionInMeal
                  ? "Nutrition can't be deleted. It is in " +
                    nutritionInMeal +
                    ' meal'
                  : 'delete nutrition'
              }
            >
              <MdDelete
                className="icon"
                style={{
                  color: nutritionInMeal ? 'grey' : 'red'
                }}
                onClick={() =>
                  nutritionDispatch({
                    type: 'DELETE',
                    id: nutrition.id
                  })
                }
              />
            </IconWithTooltip>
            <IconWithTooltip tooltipText="Show micronutrient">
              <MdAssignment className="icon" onClick={toggleShowReport} />
            </IconWithTooltip>
          </div>
        </div>
      </li>
    </>
  );
};
export default React.memo(Nutrition, (c, p) => {
  return (
    c.canNutritionBeAddedToMeal === p.canNutritionBeAddedToMeal &&
    c.nutritionInMeal === p.nutritionInMeal
  );
});
