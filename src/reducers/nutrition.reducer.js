// import uuid from 'uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_INFO':
      return { ...state, nutritionInfo: action.nutritionInfo };
    case 'NEW':
      return { ...state, nutritions: [...state.nutritions, action.nutrition] };
    case 'REMOVE':
      return {
        ...state,
        nutritions: state.nutritions.filter(
          nutrition => nutrition.id !== action.id
        )
      };
    case 'UPDATE':
      return {
        ...state,
        nutritions: state.nutritions.map(nutrition =>
          nutrition.id === action.id
            ? { ...nutrition, [action.name]: action.value }
            : nutrition
        )
      };
    default:
      return state;
  }
};

export default reducer;
