import React, { createContext } from 'react';
import useLocalStorageReducer from '../reducers/useLocalStorageReducer';
import nutritionReducer from '../reducers/nutrition.reducer';

const defaultNutritions = [
  {
    id: 39999,
    name: 'Ahven',
    energy: 594,
    carbohydrates: 4.7,
    fet: 6.4,
    protein: 19.4
  },
  {
    id: 39998,
    name: 'Ananas',
    energy: 234,
    carbohydrates: 21,
    fet: 0.1,
    protein: 0.2
  },
  {
    id: 39997,
    name: 'Aprikoosi',
    energy: 120,
    carbohydrates: 12,
    fet: 0.3,
    protein: 0.1
  }
];

export const NutritionContext = createContext();
export const NutritionDispatchContext = createContext();

export function NutritionProvider({ children }) {
  const [nutritions, dispatch] = useLocalStorageReducer(
    'nutritions',
    nutritionReducer,
    {
      nutritions: defaultNutritions,
      nutritionInfo: {}
    }
  );
  return (
    <NutritionContext.Provider value={nutritions}>
      <NutritionDispatchContext.Provider value={dispatch}>
        {children}
      </NutritionDispatchContext.Provider>
    </NutritionContext.Provider>
  );
}
