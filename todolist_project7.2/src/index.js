import React, { Component } from 'react';
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
      //action.id is stored when you click to completed
      if (state.id !== action.id)
        return state; //return list obj having completed false

      return Object.assign({}, state, {
        completed: !state.completed
      }); //return list obj having completed true
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
/**** End reducer_1 (object todo) ****/

/**** reducer_2 filter ****/
const visibilityFilter = (state = 'SHOW_ALL', action) => { //default state = 'Show All'
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter; //return filter when change link
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
    {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
  </ul>
);

class VisibleTodoList extends Component {
  componentDidMount() { //is called when component added to DOM, good place to request load data
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  };
  componentWillMount() { //is called only 1 turn before render(), sync setState()
    this.unsubscribe;
  };
  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <TodoList todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })}
      />
    );
  }
}
/**** End ToDoList View  ****/

/**** State Bar View  ****/
const Link = ({ active, children, onClick }) => {
  if (active)
    return <span>{children}</span>
  return (
    <a href="" onClick={e => {
      e.preventDefault(); //prevent event default (like click on btn or link)
      onClick(active);
    }}>
      {children}
    </a>
  )
};

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  };
  componentWillMount() {
    this.unsubscribe;
  };
  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link active={props.filter === state.visibilityFilter}
        onClick={() => store.dispatch(
          { type: 'SET_VISIBILITY_FILTER', filter: props.filter }
        )} > {props.children} </Link>
    );
  }
}

const Footer = () => (
  <p>
    Tìm theo:
    {' '} <FilterLink filter='SHOW_ALL'> Tất cả </FilterLink>
    {' | '} <FilterLink filter='SHOW_ACTIVE'> Đang làm </FilterLink>
    {' | '} <FilterLink filter='SHOW_COMPLETED'> Đã làm </FilterLink>
  </p>
);
/**** End State Bar View  ****/


let todoID = 0;
/**** Add Todo Button  ****/
const AddTodo = () => {
  let input;

  return (
    <div className="col-6 col-md-6">
      <div className='col-6 col-md-8'>
        <input type="text" className="form-control" placeholder='Viết cái gì đi...'
          ref={node => { input = node }} />
      </div>

      <div className='col-6 col-md-2'>
        <button className="btn btn-info" onClick={() => {
          store.dispatch({ type: 'ADD_TODO', id: todoID++, text: input.value });
          input.value = '';
        }}> Thêm việc </button>
      </div>
    </div>
  );
}


/**** Main ****/
const TodoApp = () => (
  <div className="col-xs-12">
    <div className="row">
      <AddTodo />

      <div className="col-6 col-md-6">
        <Footer />
        <VisibleTodoList />
      </div>

    </div>
  </div>
);

ReactDOM.render(<TodoApp />, document.getElementById('root'));