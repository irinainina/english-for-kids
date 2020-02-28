import React, {Component} from 'react';
import './Card.css';
import cardsData from '../../data/cards';


class Card extends Component {
  renderCards = (arr, onCardClick) => {
    return arr.map((item, index) => {
      const { word, image } = item;    
      return (      
        <div className="card"
           style={{backgroundImage: `url(${image})`}}
            key={index} 
            onClick={() => onCardClick(index)} >
          <div className="card-header">{word}</div>
        </div>
      );
    });
  }

  render() { 
    const {page, onCardClick} = this.props;
    const cards = this.renderCards(cardsData[page], onCardClick);
      return (
       <div className="container">
        {cards}
       </div>
      )
    }
  }

export default Card;