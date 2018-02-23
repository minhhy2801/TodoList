import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) => (
    <ul>
      {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
      {/* use callback function listen to event onClick, call onTodoClick with todo.id */}
    </ul>
  );

  export default TodoList