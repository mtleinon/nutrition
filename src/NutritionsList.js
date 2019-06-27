import React, { useContext, useState } from 'react';
import Nutrition from './Nutrition';
import { NutritionContext } from './context/nutrition.context';
import { NutritionDispatchContext } from './context/nutrition.context';
import uuidv1 from 'uuid/v1';
import IconWithTooltip from './IconWithTooltip';
import { MdAddCircle } from 'react-icons/md';
import NutritionHeading from './NutritionHeading';
import { ShowContext } from './context/show.context';
import { ShowDispatchContext } from './context/show.context';
import { MdDetails } from 'react-icons/md';

import { MealContext } from './context/meal.context';
import { Scrollbars } from 'react-custom-scrollbars';

export default function NutritionsList() {
  const nutritions = useContext(NutritionContext).nutritions;
  const nutritionDispatch = useContext(NutritionDispatchContext);
  const showDispatch = useContext(ShowDispatchContext);
  const show = useContext(ShowContext);

  const [filterState, setFilterState] = useState({
    searchString: '',
    filteredNutritions: nutritions
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [count, setCount] = useState(10);

  const meals = useContext(MealContext);

  const changeSearchString = e => {
    const newSearchString = e.target.value.toLowerCase();
    setFilterState({
      searchString: newSearchString,
      filteredNutritions: nutritions.filter(nutrition =>
        newSearchString
          .toLowerCase()
          .split(' ')
          .reduce(
            (sum, cur) => sum && nutrition.name.toLowerCase().includes(cur),
            true
          )
      )
    });

    setPage(1);
  };

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

  return (
    <div
      className={
        'nutritionListColor nutritionList' +
        (show.showNutritions ? '' : ' closedList')
      }
    >
      <div className="listTitleRow">
        <div className="listTitle">Nutritions</div>
        <input
          placeholder="Search"
          style={{ width: '6rem' }}
          onChange={changeSearchString}
          value={filterState.searchString}
        />
        {/* ({filterState.filteredNutritions.length}) */}
        {/* </div> */}
        <div className="pageSelection">
          <div className="pageButtons">
            <button
              disabled={page <= 1}
              style={{ width: '1rem' }}
              onClick={e => setPage(page - 1)}
            >
              -
            </button>
            <button
              disabled={
                page >=
                Math.ceil(filterState.filteredNutritions.length / pageSize)
              }
              style={{ width: '1rem' }}
              onClick={e => setPage(page + 1)}
            >
              +
            </button>
          </div>
          <div className="pageNumber">
            <input
              style={{ width: '2rem', textAlign: 'right' }}
              onChange={e => setPage(e.target.value)}
              value={page}
            />
            /{Math.ceil(filterState.filteredNutritions.length / pageSize)}
          </div>
        </div>
        <div className="pageSize">
          {/* PS: */}
          <input
            placeholder="PS"
            style={{ width: '2rem' }}
            onChange={e => setPageSize(e.target.value)}
            value={pageSize}
          />
        </div>
        <div className="icons">
          <IconWithTooltip tooltipText="Show plans">
            <MdDetails
              className="icon"
              style={{ color: 'green' }}
              onClick={() =>
                showDispatch({
                  type: 'TOGGLE_SHOW',
                  listName: 'showNutritions'
                })
              }
            />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Add new meal">
            <MdAddCircle
              className="icon"
              style={{ color: 'green' }}
              onClick={() =>
                nutritionDispatch({
                  type: 'NEW',
                  nutrition: {
                    id: uuidv1(),
                    name: 'name',
                    energy: 0,
                    carbohydrates: 0,
                    fet: 0,
                    protein: 0
                  }
                })
              }
            />
          </IconWithTooltip>
        </div>
      </div>
      {show.showNutritions && (
        <div className="nutritionListContainerColor listContainer">
          <div className="card">
            <div className="cardContent">
              <ul>
                <li>
                  <div style={{ marginRight: '3.2rem' }}>
                    <NutritionHeading />
                  </div>
                </li>

                {filterState.filteredNutritions
                  .filter((_, i, array) => {
                    return i >= (page - 1) * pageSize && i < page * pageSize;
                  })
                  .map(nutrition => (
                    <Nutrition
                      key={nutrition.id}
                      nutrition={nutrition}
                      mealInEditMode={mealInEditMode !== undefined}
                      canNutritionBeAddedToMeal={canNutritionBeAddedToMeal(
                        nutrition.id
                      )}
                      nutritionInMeal={nutritionInMeal(nutrition.id)}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
