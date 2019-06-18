const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW':
      return { ...state, [action.listName]: !state[action.listName] };
    case 'ADD_NUTRITION_ID': {
      const nutritionIds = state.nutritionIds;
      nutritionIds[+action.nutritionId] = action.nutritionIndex;
      return { ...state, nutritionIds };
    }
    default:
      return state;
  }
};

export default reducer;
