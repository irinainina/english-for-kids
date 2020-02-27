import React from 'react';
import './Header.css';
import cardsData from '../../data/cards';

const renderHeader = (arr, fn, page) => {
  return arr.map((item, index) => {        
    return (      
      <p className={index === page - 1 ? "header-item active" : "header-item"}         
          key={index} 
          onClick={() => fn(index)} >
          {arr[index]}
      </p>
    );
  });
}

function Header({onClick, page}) {
  const headerItems = renderHeader(cardsData[0], onClick, page);
  return (
   <div className="header">
    {headerItems}
   </div>
  )
}

export default Header;