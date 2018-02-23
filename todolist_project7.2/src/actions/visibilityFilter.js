//action has type (kiểu action) & payload (tham số)

export const setVisibilityFilter = (filter) => {
    return { 
      type: 'SET_VISIBILITY_FILTER', 
      filter 
    };
  }