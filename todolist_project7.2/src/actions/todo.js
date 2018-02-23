//action has type (kiểu action) & payload (tham số)

let todoID = 0;

//action type usually const
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: todoID++,
    text
  }
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
};
