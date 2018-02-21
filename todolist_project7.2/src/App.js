//import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import './App.css';

//1st reducer
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
}

//2nd reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

/* Store Before
const testToggleTodo = () => {
  const stateBefore = [{
    id: 0, text: 'learn redux', completed: false
  }, { id: 1, text: 'learn react', completed: false }];

  const stateAfter = [{
    id: 0, text: 'learn redux', completed: false
  }, { id: 1, text: 'learn react', completed: true }];

  const action = {
    type: 'TOGGLE_TODO', id: 1
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testAddTodo = () => {
  const stateBefore = [];
  const stateAfter = [{ id: 0, text: 'Learn Redux', completed: false }];

  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
  //console.log(stateAfter);
};
testAddTodo();
testToggleTodo();
*/


/** CombineReducer Before
const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};
*/
//CombineReducer After
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
/**
 * Compostion objects (Store After)
 */
//const store = createStore(todos);
const store = createStore(todoApp);
console.log('Initial state');
console.log(store.getState());
console.log('-----ADD_TODO------');

store.dispatch({ id: 0, text: 'learn redux', type: 'ADD_TODO' });
console.log('Current state 1');
console.log(store.getState());
console.log('-----------');

store.dispatch({ id: 1, text: 'learn react', type: 'ADD_TODO' });
console.log('Current state 2');
console.log(store.getState());
console.log('-----TOGGLE_TODO------');
store.dispatch({ id: 0, type: 'TOGGLE_TODO' });
console.log(store.getState()); //completed state change true
console.log('-----SET_VISIBILITY_FILTER------');
store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED' });
console.log(store.getState());
console.log("Test passed!")
