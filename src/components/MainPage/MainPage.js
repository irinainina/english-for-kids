import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import cardsData from '../../data/cards';

const renderMainPage = (arr, fn, page) => {
  return arr.map((item, index) => {        
    return (  
      <Link to={'/cards'} 
          className="main-card"         
          key={index} 
          onClick={() => fn(index)} >
          <img src={arr[index].image}
              alt={arr[index].category} />
          {arr[index].category}
      </Link>
    );
  });
}

function MainPage({onClick, page}) {
  const mainPageItems = renderMainPage(cardsData[0], onClick, page);
  return ( 
    <div className="container main-container">
        {mainPageItems}
   </div>
  )
}

export default MainPage;