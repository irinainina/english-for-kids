import React, {Component} from 'react';
import './Card.css';
import cardsData from '../../data/cards';


class Card extends Component {
  renderCards = (arr, onCardClick, onBtnClick) => {
    return arr.map((item, index) => {
      const { word, image } = item;    
      return (      
        <div className="card"
           style={{backgroundImage: `url(${image})`}}
            key={index} 
            onClick={(event) => onCardClick(event, index)} >
          <div className="card-header">{word}</div>
        </div>
      );
    });
  }

  render() { 
    const {page, onCardClick, onBtnClick, play} = this.props;
    const cards = this.renderCards(cardsData[page], onCardClick);
      return (
       <div className="container">
        <div className="rating"></div>
        {cards}
                <div className="btns">      
          <button className={play ? "btn repeat" : "btn"}
                  onClick={onBtnClick}>
           Play
          </button>
        </div>
        <audio className="audio"></audio>
        <audio className="soundEffects"></audio>
       </div>
      )
    }
  }

export default Card;