import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import TodoApp from './components/TodoApp';
import configureStore from './store/configureStore';

//user (like press button) -> action 
//-> reducer(function, return new state) 
//-> store -> state -> UI

ReactDOM.render(
  <Provider store={configureStore()}>
    <TodoApp />
  </Provider>
  , document.getElementById('root'));
 