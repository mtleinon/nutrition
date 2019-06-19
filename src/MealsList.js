import React, { useContext } from 'react';
import Meal from './Meal';
import { MealContext } from './context/meal.context';
import { MealDispatchContext } from './context/meal.context';
import uuidv1 from 'uuid/v1';
import IconWithTooltip from './IconWithTooltip';
import { MdAddCircle } from 'react-icons/md';
import { MdDetails } from 'react-icons/md';
import { ShowContext } from './context/show.context';
import { ShowDispatchContext } from './context/show.context';

export default function MealsList() {
  const meals = useContext(MealContext);
  const mealDispatch = useContext(MealDispatchContext);
  const showDispatch = useContext(ShowDispatchContext);
  const show = useContext(ShowContext);
  return (
    <div
      className="mealList"
      style={{ height: show.showMeals ? '40 vh' : '2rem' }}
    >
      <div className="listTitleRow">
        <div className="listTitle">Meals</div>
        <div className="icons">
          <IconWithTooltip tooltipText="Show meals">
            <MdDetails
              className="icon"
              style={{ color: 'green' }}
              onClick={() =>
                showDispatch({
                  type: 'TOGGLE_SHOW',
                  listName: 'showMeals'
                })
              }
            />
          </IconWithTooltip>

          <IconWithTooltip tooltipText="Add new meal">
            <MdAddCircle
              className="icon"
              style={{ color: 'green' }}
              onClick={() =>
                mealDispatch({
                  type: 'ADD',
                  meal: {
                    id: uuidv1(),
                    name: 'new Meal',
                    nutritions: []
                  }
                })
              }
            />
          </IconWithTooltip>
        </div>
      </div>
      {show.showMeals && (
        <ul>
          {meals.map(meal => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </ul>
      )}
    </div>
  );
}
