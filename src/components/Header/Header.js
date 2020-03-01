import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import cardsData from '../../data/cards';

const renderHeader = (arr, fn, page) => {
  return arr.map((item, index) => {        
    return ( 
      <Link to={'/cards'} className={index === page - 1 ? "header-item active" : "header-item"}  
          key={index} 
          onClick={() => fn(index)} >
          {arr[index].category}
      </Link>
    );
  });
}

function Header({onClick, page, onHeaderClick}) {
  const headerItems = renderHeader(cardsData[0], onClick, page);
  return (
   <nav role="navigation">
    <div className="menuToggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul className="menu" >
        <Link to={'/'} className={page === 0 ? "header-item active" : "header-item"}
         onClick={onHeaderClick}>
          Main Page
        </Link>
        {headerItems}
      </ul>
    </div>
  </nav>
  )
}

export default Header;