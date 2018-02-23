import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

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

  export default TodoApp