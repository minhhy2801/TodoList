//(previousState, action) => newState
//not change previousState

/**** reducer_1 (object todo) ****/
const todo = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          completed: false
        } //create obj
      case 'TOGGLE_TODO':
        //action.id is stored when you click to completed
        if (state.id !== action.id)
          return state; //return list obj having completed false
        return { ...state, completed: !state.completed } //return list obj having completed true
      default:
        return state;
    }
  };
  
  //    List obj todo
  const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state, todo(undefined, action)
        ];  // ...state: set obj todo to array
      case 'TOGGLE_TODO':
        return state.map(t => todo(t, action));
      //  .map like forEach: duyệt từng phần tử trong state list
      // => return array, t đại diện cho một phần tử 
      //         state.map(function (t) => {
      //           return todo(t, action);
      //         }) 
      default:
        return state;
    }
  };


  export default todos