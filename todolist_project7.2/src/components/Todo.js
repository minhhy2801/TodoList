import React from 'react'

const Todo = ({ onClick, completed, text }) => (
    <li className="listTodo" onClick={onClick}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}> {text} </li>
    //onClick change style
);

export default Todo