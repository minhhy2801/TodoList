//(previousState, action) => newState
//not change previousState

/**** reducer_2 filter ****/
const visibilityFilter = (state = 'SHOW_ALL', action) => { //default state = 'Show All'
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter; //return filter when change link
    default:
      return state;
  }
};

export default visibilityFilter