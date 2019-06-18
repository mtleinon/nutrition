// import uuid from 'uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.plan];
    case 'REMOVE':
      return state.filter(plan => plan.id !== action.id);

    // Add meal to the plan if the plan is the only plan or
    // it is in edit mode.
    case 'ADD_MEAL':
      return state.map(plan =>
        plan.editMode || state.length === 1
          ? { ...plan, meals: [...plan.meals, { id: action.id }] }
          : plan
      );
    case 'UPDATE':
      return state.map(plan =>
        plan.id === action.id ? { ...plan, [action.name]: action.value } : plan
      );

    case 'REMOVE_MEAL':
      return state.map(plan =>
        plan.id === action.planId
          ? {
              ...plan,
              meals: plan.meals.filter(meal => meal.id !== action.mealId)
            }
          : plan
      );
    case 'TOGGLE_EDIT_MODE':
      // Toggle plans edit mode and set edit mode to false in other plans
      return state.map(plan =>
        plan.id === action.id
          ? { ...plan, editMode: !plan.editMode }
          : { ...plan, editMode: false }
      );
    default:
      return state;
  }
};

export default reducer;
