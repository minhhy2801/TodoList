//Dumb Component NOT talk with redux

import React from 'react';

const AddTodoEntry = ({ onClick }) => {
    let input;
  
    return (
      <div className="col-6 col-md-6">
        <div className='col-6 col-md-8'>
          <input type="text" className="form-control" placeholder='Viết cái gì đi...'
            ref={node => { input = node }} />
        </div>
  
        <div className='col-6 col-md-2'>
          <button className="btn btn-info" onClick={() => {
            onClick(input.value);
            input.value = '';
          }}> Thêm việc </button>
        </div>
      </div>
    );
  }

export default AddTodoEntry;