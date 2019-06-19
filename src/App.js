import React from 'react';
import './App.css';
import MealsList from './MealsList';
import PlansList from './PlansList';
import NutritionsList from './NutritionsList';
import { NutritionProvider } from './context/nutrition.context';
import { MealProvider } from './context/meal.context';
import { PlanProvider } from './context/plan.context';
import { ShowProvider } from './context/show.context';
import ReadNutritions from './ReadNutritions';
import ShowSetNutritionCache from './ShowSetnutritionCache';

// import Test from './Test';
function App() {
  return (
    <ShowProvider>
      <NutritionProvider>
        <MealProvider>
          <PlanProvider>
            <div className="container">
              {/* <ReadNutritions />
              <ShowSetNutritionCache /> */}
              <PlansList />
              <MealsList />
              <NutritionsList />
            </div>
          </PlanProvider>
        </MealProvider>
      </NutritionProvider>
    </ShowProvider>
  );
}

export default App;
/*
  Plans       Meals           Nutritions
  -plan*       -meal*
    -name       -name
    -meal1*     -Nutrition*
    -meal2        -name
    -meal3        -amount  
  -summary


*/
