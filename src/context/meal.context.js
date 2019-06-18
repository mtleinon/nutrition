import React, { createContext } from 'react';
import useLocalStorageReducer from '../reducers/useLocalStorageReducer';
import mealReducer from '../reducers/meal.reducer';

const defaultMeals = [
  {
    id: 1,
    editMode: false,
    name: 'Aamiainen',
    nutritions: [
      { id: 39997, amount: 100 },
      { id: 39998, amount: 150 },
      { id: 39999, amount: 200 }
    ]
  },
  {
    id: 2,
    editMode: false,
    name: 'Päivällinen',
    nutritions: [
      { id: 39997, amount: 100 },
      { id: 39998, amount: 150 },
      { id: 39999, amount: 200 }
    ]
  },
  {
    id: 3,
    editMode: false,
    name: 'illallinen',
    nutritions: [{ id: 39999, amount: 100 }, { id: 39998, amount: 150 }]
  }
];

export const MealContext = createContext();
export const MealDispatchContext = createContext();

export function MealProvider({ children }) {
  const [meals, dispatch] = useLocalStorageReducer(
    'meals',
    mealReducer,
    defaultMeals
  );
  return (
    <MealContext.Provider value={meals}>
      <MealDispatchContext.Provider value={dispatch}>
        {children}
      </MealDispatchContext.Provider>
    </MealContext.Provider>
  );
}
