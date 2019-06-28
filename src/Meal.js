import React, { useContext, useState } from 'react';
import { PlanDispatchContext } from './context/plan.context';
import { MealDispatchContext } from './context/meal.context';
import { NutritionContext } from './context/nutrition.context';
import { PlanContext } from './context/plan.context';
import NutritionShow from './NutritionShow';
import NutritionHeading from './NutritionHeading';
import EditableValue from './EditableValue';
import IconWithTooltip from './IconWithTooltip';
import { MdAddCircle } from 'react-icons/md';
import { MdDetails } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import MealSummary from './MealSummary';
import { ShowContext } from './context/show.context';
import NutritionSummary from './NutritionSummary';
import useModal from './modal/useModal';
import Modal from './modal/Modal';
import MealMicronutrientSummary from './MealMicronutrientSummary';

export default function Meal({ meal }) {
  const [showContent, setShowContent] = useState({
    summary: true,
    detailedSummary: false,
    report: false
  });
  const [showReport, toggleShowReport] = useModal();

  const show = useContext(ShowContext);
  const mealDispatch = useContext(MealDispatchContext);
  const planDispatch = useContext(PlanDispatchContext);
  const allNutritions = useContext(NutritionContext).nutritions;
  const allPlans = useContext(PlanContext);

  const updateValue = (name, newValue) => {
    mealDispatch({
      type: 'UPDATE',
      id: meal.id,
      name: name,
      value: newValue
    });
  };
  const updateNutritionAmountValue = (name, newValue) => {
    mealDispatch({
      type: 'UPDATE_NUTRITION',
      mealId: meal.id,
      nutritionId: name,
      amount: newValue
    });
  };
  const removeNutrition = nutritionId => {
    mealDispatch({
      type: 'REMOVE_NUTRITION',
      mealId: meal.id,
      nutritionId
    });
  };
  const planInEditMode =
    allPlans.length === 1 ? allPlans[0] : allPlans.find(plan => plan.editMode);

  const mealInPlan = allPlans.find(plan =>
    plan.meals.find(mealInPlan => mealInPlan.id === meal.id)
  );

  const mealCanBeAddedToPlan = () => {
    if (planInEditMode) {
      if (!planInEditMode.meals.find(mealInPlan => mealInPlan.id === meal.id)) {
        return true;
      }
    }
    return false;
  };

  const addMealToPlan = () => {
    if (mealCanBeAddedToPlan()) {
      planDispatch({
        type: 'ADD_MEAL',
        id: meal.id
      });
    }
  };
  const deleteMeal = () => {
    if (!mealInPlan) {
      mealDispatch({
        type: 'REMOVE',
        id: meal.id
      });
    }
  };

  return (
    <>
      <Modal isShowing={showReport} hide={toggleShowReport}>
        <MealMicronutrientSummary
          meal={meal}
          showBorderTop={true}
          hide={toggleShowReport}
        />
      </Modal>
      <div className={'card' + (meal.editMode ? ' editMode' : '')}>
        <div className="cardTitleRow">
          <div className="cardTitle">
            <EditableValue
              initialValue={meal.name}
              name="name"
              updateValue={updateValue}
              width="100%"
            />{' '}
          </div>

          <div className="icons">
            <IconWithTooltip tooltipText="Show micronutrient report from the meal">
              <MdDetails className="icon" onClick={toggleShowReport} />
            </IconWithTooltip>
            <IconWithTooltip tooltipText="Show nutrients of the meal">
              <MdDetails
                className="icon"
                onClick={() =>
                  setShowContent(state => ({
                    ...state,
                    summary: !state.summary
                  }))
                }
              />
            </IconWithTooltip>
            <IconWithTooltip tooltipText="Show details nutrients of the meal">
              <MdDetails
                className="icon"
                onClick={() =>
                  setShowContent(state => ({
                    ...state,
                    detailedSummary: !state.detailedSummary
                  }))
                }
              />
            </IconWithTooltip>
            <IconWithTooltip
              tooltipText={
                mealCanBeAddedToPlan()
                  ? 'Add meal to plan'
                  : planInEditMode
                  ? 'Meal is already in plan'
                  : 'Add meal to plan by setting a plan to edit mode first.'
              }
            >
              <MdAddCircle
                className="icon"
                style={{
                  color: mealCanBeAddedToPlan() ? 'green' : 'grey'
                }}
                onClick={addMealToPlan}
              />
            </IconWithTooltip>
            <IconWithTooltip
              tooltipText={
                !meal.editMode
                  ? 'Set edit mode. Add nutrients to meal.'
                  : 'Close edit mode.'
              }
            >
              <MdModeEdit
                className="icon"
                onClick={() =>
                  mealDispatch({
                    type: 'TOGGLE_EDIT_MODE',
                    id: meal.id
                  })
                }
              />
            </IconWithTooltip>
            <IconWithTooltip
              tooltipText={
                mealInPlan
                  ? 'Meal can\'t be deleted. It is in "' +
                    mealInPlan.name +
                    '" plan.'
                  : 'Delete meal.'
              }
            >
              <MdDelete
                className="icon"
                style={{ color: mealInPlan ? 'gray' : 'red' }}
                onClick={deleteMeal}
              />
            </IconWithTooltip>
          </div>
        </div>
        {showContent.summary && meal.nutritions.length > 0 && (
          <div className="cardContent">
            <ul>
              <li>
                <div style={{ marginRight: '1.6rem' }}>
                  <NutritionHeading printAmount={true} />
                </div>
              </li>
              {meal.nutritions.map(nutrition => (
                <li key={nutrition.id}>
                  <div className="nutritionRow ">
                    <NutritionShow
                      nutrition={
                        show.nutritionIds
                          ? // ? allNutritions[show.nutritionIds[nutrition.id]] //TODO: optimize
                            allNutritions.find(n => n.id === nutrition.id)
                          : allNutritions.find(n => n.id === nutrition.id)
                      } //TODO: optimize
                    />
                    <EditableValue
                      // className="nutritionValue"
                      initialValue={nutrition.amount}
                      name={nutrition.id}
                      updateValue={updateNutritionAmountValue}
                      width="3rem"
                      type="number"
                    />
                    <div className="icons">
                      <IconWithTooltip
                        className="IconWithTooltip"
                        tooltipText="Remove nutrition"
                        position="right center"
                      >
                        <MdDelete
                          className="icon"
                          style={{ color: 'red' }}
                          onClick={() => removeNutrition(nutrition.id)}
                        />
                      </IconWithTooltip>
                    </div>
                  </div>
                </li>
              ))}
              <li>
                <div
                  className="nutritionRow summaryBorder"
                  style={{ marginRight: '4.6rem' }}
                >
                  <MealSummary meal={meal} showBorderTop={true} />
                </div>
                {showContent.detailedSummary && (
                  <NutritionSummary meal={meal} showBorderTop={true} />
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
