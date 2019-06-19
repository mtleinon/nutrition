import React, { useContext } from 'react';
import { PlanDispatchContext } from './context/plan.context';
import { MealContext } from './context/meal.context';
import EditableValue from './EditableValue';

import IconWithTooltip from './IconWithTooltip';
import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import MealSummary from './MealSummary';
import PlanSummary from './PlanSummary';
import NutritionHeading from './NutritionHeading';

export default function Plan({ plan }) {
  const planDispatch = useContext(PlanDispatchContext);
  const allMeals = useContext(MealContext);

  const updateValue = (name, newValue) => {
    planDispatch({
      type: 'UPDATE',
      id: plan.id,
      name: name,
      value: newValue
    });
  };

  return (
    <div className={'card' + (plan.editMode ? ' editMode' : '')}>
      <div className="cardTitleRow">
        <div className="cardTitle">
          <EditableValue
            initialValue={plan.name}
            name="name"
            updateValue={updateValue}
            width="100%"
            type="text"
          />
        </div>
        <div className="icons">
          <IconWithTooltip
            tooltipText={
              !plan.editMode
                ? 'Set edit mode. Add meals to plan.'
                : 'Close edit mode.'
            }
          >
            <MdModeEdit
              className="icon"
              onClick={() =>
                planDispatch({
                  type: 'TOGGLE_EDIT_MODE',
                  id: plan.id
                })
              }
            />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Delete plan">
            <MdDelete
              className="icon"
              style={{ color: 'red' }}
              onClick={() =>
                planDispatch({
                  type: 'REMOVE',
                  id: plan.id
                })
              }
            />
          </IconWithTooltip>
        </div>
      </div>
      {plan.meals.length > 0 && (
        <div className="cardContent">
          <ul>
            <li>
              <div style={{ marginRight: '1.6rem' }}>
                <NutritionHeading />
              </div>
            </li>
            {plan.meals.map(meal => (
              <li key={meal.id}>
                <div className="nutritionRow">
                  <MealSummary
                    name={allMeals.find(m => m.id === meal.id).name}
                    meal={allMeals.find(m => m.id === meal.id)}
                  />
                  <div className="icons">
                    <IconWithTooltip
                      tooltipText="Remove meal"
                      position="right center"
                    >
                      <MdDelete
                        className="icon"
                        style={{ color: 'red' }}
                        onClick={() =>
                          planDispatch({
                            type: 'REMOVE_MEAL',
                            planId: plan.id,
                            mealId: meal.id
                          })
                        }
                      />
                    </IconWithTooltip>
                  </div>
                </div>
              </li>
            ))}
            <li>
              <div style={{ marginRight: '1.6rem' }}>
                <PlanSummary plan={plan} showBorderTop={true} />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
