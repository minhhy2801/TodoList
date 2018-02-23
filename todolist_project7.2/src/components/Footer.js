import React from 'react'
import FilterLink from '../containers/FilterLink';

const Footer = () => (
    <p>
      Tìm theo:
      {' '} <FilterLink filter='SHOW_ALL' > Tất cả </FilterLink>
      {' | '} <FilterLink filter='SHOW_ACTIVE' > Đang làm </FilterLink>
      {' | '} <FilterLink filter='SHOW_COMPLETED' > Đã làm </FilterLink>
    </p>
  );

export default Footer