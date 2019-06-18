import React, { createContext } from 'react';
import useLocalStorageReducer from '../reducers/useLocalStorageReducer';
import planReducer from '../reducers/plan.reducer';

const defaultPlans = [
  {
    id: 1,
    editMode: false,
    name: 'Lisää painoa',
    meals: [{ id: 1 }, { id: 2 }, { id: 3 }]
  },
  {
    id: 2,
    editMode: false,
    name: 'Pudota painoa',
    meals: [{ id: 1 }, { id: 2 }]
  },
  {
    id: 3,
    editMode: false,
    name: 'Pudota paljon painoa ',
    meals: [{ id: 2 }, { id: 3 }]
  }
];

export const PlanContext = createContext();
export const PlanDispatchContext = createContext();

export function PlanProvider({ children }) {
  const [plans, dispatch] = useLocalStorageReducer(
    'plans',
    planReducer,
    defaultPlans
  );
  return (
    <PlanContext.Provider value={plans}>
      <PlanDispatchContext.Provider value={dispatch}>
        {children}
      </PlanDispatchContext.Provider>
    </PlanContext.Provider>
  );
}
