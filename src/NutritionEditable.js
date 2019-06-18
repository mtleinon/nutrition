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
    <div style={{ display: 'inline-block' }}>
      <EditableValue
        initialValue={nutrition.name}
        name="name"
        updateValue={updateValue}
        width="10rem"
        tooltip={nutrition.name}
      />
      <EditableValue
        initialValue={nutrition.energy}
        name="energy"
        updateValue={updateValue}
        width="3rem"
        type="number"
      />
      <EditableValue
        initialValue={nutrition.protein}
        name="protein"
        updateValue={updateValue}
        width="3rem"
        type="number"
      />
      <EditableValue
        initialValue={nutrition.fet}
        name="fet"
        updateValue={updateValue}
        width="3rem"
        type="number"
      />
      <EditableValue
        initialValue={nutrition.carbohydrates}
        name="carbohydrates"
        updateValue={updateValue}
        width="3rem"
        type="number"
      />
    </div>
  );
}
