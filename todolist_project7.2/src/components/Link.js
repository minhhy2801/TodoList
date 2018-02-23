import React from 'react';


const Link = ({ active, children, onClick }) => {
    if (active)
      return <span>{children}</span>
    return (
      <a href="" onClick={e => {
        e.preventDefault(); //prevent event default (like click on btn or link)
        onClick();
      }}>
        {children}
      </a>
    )
  };
  export default Link