import React, { useContext } from 'react';
import Meal from './Meal';
import { MealContext } from './context/meal.context';
import { MealDispatchContext } from './context/meal.context';
import uuidv1 from 'uuid/v1';
import IconWithTooltip from './IconWithTooltip';
import { MdAddCircle } from 'react-icons/md';
import { MdExpandLess } from 'react-icons/md';
import { MdExpandMore } from 'react-icons/md';
import { MdDetails } from 'react-icons/md';
import { ShowContext } from './context/show.context';
import { ShowDispatchContext } from './context/show.context';

export default function MealsList() {
  const meals = useContext(MealContext);
  const mealDispatch = useContext(MealDispatchContext);
  const showDispatch = useContext(ShowDispatchContext);
  const show = useContext(ShowContext);

  const toggleShowMeals = () => {
    showDispatch({
      type: 'TOGGLE_SHOW',
      listName: 'showMeals'
    });
  };
  return (
    <div
      className={
        'mealListColor mealList' + (show.showMeals ? '' : ' closedList')
      }
    >
      <div className="listTitleRow">
        <div className="listTitle">Meals</div>
        <div className="icons">
          {show.showMeals ? (
            <IconWithTooltip tooltipText="Hide meals">
              <MdExpandLess className="icon" onClick={toggleShowMeals} />
            </IconWithTooltip>
          ) : (
            <IconWithTooltip tooltipText="Show meals">
              <MdExpandMore className="icon" onClick={toggleShowMeals} />
            </IconWithTooltip>
          )}
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
        <div className="mealListContainerColor listContainer">
          <ul>
            {meals.map(meal => (
              <Meal key={meal.id} meal={meal} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
