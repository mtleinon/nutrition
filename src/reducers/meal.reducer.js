const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.meal];
    case 'REMOVE':
      return state.filter(meal => meal.id !== action.id);
    case 'UPDATE':
      return state.map(meal =>
        meal.id === action.id ? { ...meal, [action.name]: action.value } : meal
      );
    case 'SET_SUMMARY':
      return state.map(meal =>
        meal.id === action.id ? { ...meal, summary: action.summary } : meal
      );
    // Toggle plans edit mode and set edit mode to false in other plans
    case 'TOGGLE_EDIT_MODE':
      return state.map(meal =>
        meal.id === action.id
          ? { ...meal, editMode: !meal.editMode }
          : { ...meal, editMode: false }
      );

    // Add nutrition to the meal if the meal is the only meal or
    // it is in edit mode.
    case 'ADD_NUTRITION':
      return state.map(meal =>
        meal.editMode || state.length === 1
          ? { ...meal, nutritions: [...meal.nutritions, action.nutrition] }
          : meal
      );
    case 'UPDATE_NUTRITION':
      return state.map(meal =>
        meal.id === action.mealId
          ? {
              ...meal,
              nutritions: meal.nutritions.map(nutrition =>
                nutrition.id === action.nutritionId
                  ? { ...nutrition, amount: action.amount }
                  : nutrition
              )
            }
          : meal
      );

    case 'REMOVE_NUTRITION':
      return state.map(meal =>
        meal.id === action.mealId
          ? {
              ...meal,
              nutritions: meal.nutritions.filter(
                nutrition => nutrition.id !== action.nutritionId
              )
            }
          : meal
      );

    default:
      return state;
  }
};

export default reducer;
