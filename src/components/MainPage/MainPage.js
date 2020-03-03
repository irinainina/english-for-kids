import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import cardsData from '../../data/cards';

const renderMainPage = (arr, fn, page, play) => {
  return arr.map((item, index) => {        
    return (  
      <Link to={'/cards'} 
          className={play ? "main-card" : "main-card green"}        
          key={index} 
          onClick={() => fn(index)} >
          <img src={arr[index].image}
              alt={arr[index].category} />
          {arr[index].category}
      </Link>
    );
  });
}

function MainPage({onClick, page, play}) {
  const mainPageItems = renderMainPage(cardsData[0], onClick, page, play);
  return ( 
    <div className="container main-container">
        {mainPageItems}
   </div>
  )
}

export default MainPage;