// import uuid from 'uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
      return [...state, action.nutrition];
    case 'REMOVE':
      return state.filter(nutrition => nutrition.id !== action.id);
    case 'UPDATE':
      return state.map(nutrition =>
        nutrition.id === action.id
          ? { ...nutrition, [action.name]: action.value }
          : nutrition
      );
    default:
      return state;
  }
};

export default reducer;
