//containers (smart components)
//container talk with redux

import {toggleTodo} from '../actions/todo';
import TodoList from '../components/TodoList';
import {connect} from 'react-redux';

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

//define TodoList props ~ dispatch VisibleTodoList
const mapDispatchToTodoListProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    };
};


//mapStateToProps(state, [ownProps])
const mapStateToTodoListProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
};

export default connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);