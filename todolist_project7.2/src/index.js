import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers } from 'redux'

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
      if (state.id !== action.id) {
        return state;
      } // state change 
      return Object.assign({}, state, {
        completed: !state.completed
      }); //copy obj having state change to tmp obj state (completed or not)
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
      ];  // ...state: call all obj arrays
    //function todo default undefined`
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    //  .map like forEach 
    // => truyền từng tham số t vào hàm todo cuối cùng trả về 1 mảng mới nhờ map
    //         state.map(function (t) => {
    //           return todo(t, action);
    //         }) 
    default:
      return state;
  }
};
/**** End reducer_1 (object todo) ****/

/**** reducer_2 filter ****/
const visibilityFilter = (state = 'SHOW_ALL', action) => { //default state = 'Show All'
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};


//CombineReducer
const todoApp = combineReducers({
  todos, visibilityFilter
});

//Compostion objects (Store After)
const store = createStore(todoApp);

/**** Get todolists array when filter = ? ****/
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
  };
}

/**** ToDoList View  ****/
const Todo = ({ onClick, completed, text }) => (
  <li className="listTodo" onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}> {text} </li>
  //onClick change style
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => <Todo key={todo.id}{...todo} onClick={() => onTodoClick(todo.id)} />)}
  </ul>
);
/**** End ToDoList View  ****/

/**** State Bar View  ****/
const FilterLink = ({ filter, children, currentFilter, onClick }) => {
  if (filter === currentFilter)
    return <span>{children}</span>

  return (
    <a href="" onClick={e => {
      e.preventDefault(); //prevent event default (like click on btn or link)
      onClick(filter);
    }}>
      {children}
    </a>
  )
};

//visibilityFilter is function return state (reducer_2)
const Footer = ({ visibilityFilter, onFilterClick }) => (
  <p>
    Tìm theo:
    {' '} <FilterLink filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}> Tất cả </FilterLink>
    {' | '} <FilterLink filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}> Đang làm </FilterLink>
    {' | '} <FilterLink filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}> Đã làm </FilterLink>
  </p>
);
/**** End State Bar View  ****/


/**** Add Todo Button  ****/
const AddTodo = ({ onAddClick }) => {
  let input;

  return (
    <div className="col-6 col-md-6">
      <div className='col-6 col-md-8'>
        <input type="text" className="form-control" placeholder='Viết cái gì đi...'
          ref={node => { input = node }} />
      </div>

      <div className='col-6 col-md-2'>
        <button className="btn btn-info" onClick={() => {
          onAddClick(input.value);
          input.value = '';
        }}> Thêm việc </button>
      </div>
    </div>
  );
}


/**** Main ****/
let todoID = 0;
//todos, visibilityFilter is function return state (reducer_1,2)
const TodoApp = ({ todos, visibilityFilter }) =>
  (
    <div className="col-xs-12">
      <div className="row">

        <AddTodo onAddClick={text => store.dispatch(
          { type: 'ADD_TODO', text, id: todoID++ }
        )} />

        <div className="col-6 col-md-6">
          <Footer visibilityFilter={visibilityFilter}
            onFilterClick={filter => store.dispatch(
              { type: 'SET_VISIBILITY_FILTER', filter }
            )} />

          <TodoList todos={getVisibleTodos(todos, visibilityFilter)}
            onTodoClick={id => store.dispatch(
              { type: 'TOGGLE_TODO', id }
            )} />
        </div>

      </div>
    </div>
  );

const render = () => {
  ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'));
};

store.subscribe(render);
render();