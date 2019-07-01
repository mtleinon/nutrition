import React, { useContext, useState } from 'react';
import { PlanDispatchContext } from './context/plan.context';
import { MealDispatchContext } from './context/meal.context';
import { NutritionContext } from './context/nutrition.context';
import { PlanContext } from './context/plan.context';
import NutritionShow from './NutritionShow';
import MealHeading from './MealHeading';
import EditableValue from './EditableValue';
import IconWithTooltip from './IconWithTooltip';
import { MdAddCircle } from 'react-icons/md';
import { MdExpandMore } from 'react-icons/md';
import { MdExpandLess } from 'react-icons/md';
import { MdDetails } from 'react-icons/md';
import { MdAssignment } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import MealSummary from './MealSummary';
import { ShowContext } from './context/show.context';
import NutritionSummary from './NutritionSummary';
import MealMicronutrientSummary from './MealMicronutrientSummary';
import useModal from './modal/useModal';
import Modal from './modal/Modal';
import ReactResizeDetector from 'react-resize-detector';

export default function Meal({ meal }) {
  const [wideComponent, setWideComponent] = useState(true);
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
  const toggleShowSummary = () => {
    setShowContent(state => ({
      ...state,
      summary: !state.summary
    }));
  };

  const onResize = width => {
    console.log(width);
    if (width < 500) {
      setWideComponent(false);
    } else {
      setWideComponent(true);
    }
  };
  const mealAmount = meal.nutritions.reduce(
    (sum, nutrition) => sum + nutrition.amount,
    0
  );
  return (
    <>
      <ReactResizeDetector handleWidth onResize={onResize} />
      <Modal isShowing={showReport} hide={toggleShowReport}>
        <MealMicronutrientSummary
          meal={meal}
          name={meal.name}
          hide={toggleShowReport}
        />
      </Modal>
      <div className={'card' + (meal.editMode ? ' editMode' : '')}>
        <div className="cardTitleRow">
          <div className="cardTitle">
            <EditableValue
              className="gridName"
              initialValue={meal.name}
              name="name"
              updateValue={updateValue}
              width="100%"
            />{' '}
          </div>

          <div className="icons">
            <IconWithTooltip tooltipText="Show micronutrient report from the meal">
              <MdAssignment className="icon" onClick={toggleShowReport} />
            </IconWithTooltip>
            {showContent.summary ? (
              <IconWithTooltip tooltipText="Hide nutrients of the meal">
                <MdExpandLess className="icon" onClick={toggleShowSummary} />
              </IconWithTooltip>
            ) : (
              <IconWithTooltip tooltipText="Show nutrients of the meal">
                <MdExpandMore className="icon" onClick={toggleShowSummary} />
              </IconWithTooltip>
            )}
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
              <li
                className={`mealGrid ${!wideComponent ? 'narrowMealGrid' : ''}`}
              >
                <MealHeading wideComponent={wideComponent} />
              </li>
              {meal.nutritions.map(nutrition => (
                <li
                  key={nutrition.id}
                  className={`mealGrid ${
                    !wideComponent ? 'narrowMealGrid' : ''
                  }`}
                >
                  <NutritionShow
                    amount={nutrition.amount}
                    wideComponent={wideComponent}
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
                    decimals={0}
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
                </li>
              ))}
              <li
                className={`mealGrid ${!wideComponent ? 'narrowMealGrid' : ''}`}
              >
                {wideComponent ? (
                  <MealSummary
                    wideComponent={wideComponent}
                    meal={meal}
                    showBorderTop={true}
                  />
                ) : (
                  <div className="gridName borderTop" />
                )}
                <div className="gridNumber borderTop boldText">
                  {mealAmount}
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
