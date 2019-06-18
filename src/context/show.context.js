import React, { createContext } from 'react';
import useLocalStorageReducer from '../reducers/useLocalStorageReducer';
import showReducer from '../reducers/show.reducer';

const showDefaultLists = {
  showPlans: true,
  showMeals: true,
  showNutritions: true,
  nutritionIds: []
  // nutritionIds is used as a cache, it is indexed by nutritionId
  // and its value is the index of the nutrition in nutritions array.
  // So with this array we can get the nutrition by getting 2 values
  // from two arrays by using indexes. Otherwise we would have to loop
  // an array of 4000 items and comparing id strings.
};
export const ShowContext = createContext();
export const ShowDispatchContext = createContext();

export function ShowProvider({ children }) {
  const [show, dispatch] = useLocalStorageReducer(
    'show',
    showReducer,
    showDefaultLists
  );
  return (
    <ShowContext.Provider value={show}>
      <ShowDispatchContext.Provider value={dispatch}>
        {children}
      </ShowDispatchContext.Provider>
    </ShowContext.Provider>
  );
}
