import React, { useContext } from 'react';
import EditableValue from './EditableValue';
import { NutritionDispatchContext } from './context/nutrition.context';

export default function NutritionEditable({ nutrition }) {
  const nutritionDispatch = useContext(NutritionDispatchContext);
  const updateValue = (name, newValue) => {
    nutritionDispatch({
      type: 'UPDATE',
      id: nutrition.id,
      name: name,
      value: newValue
    });
  };

  return (
    <>
      <EditableValue
        className="nutritionName"
        initialValue={nutrition.name}
        name="name"
        updateValue={updateValue}
        tooltip={nutrition.name}
        width="100%"
      />
      <EditableValue
        width="100%"
        initialValue={nutrition.energy}
        name="energy"
        updateValue={updateValue}
        type="number"
      />
      <EditableValue
        width="100%"
        initialValue={nutrition.protein}
        name="protein"
        updateValue={updateValue}
        type="number"
      />
      <EditableValue
        width="100%"
        initialValue={nutrition.fet}
        name="fet"
        updateValue={updateValue}
        type="number"
      />
      <EditableValue
        width="100%"
        initialValue={nutrition.carbohydrates}
        name="carbohydrates"
        updateValue={updateValue}
        type="number"
      />
    </>
  );
}
