import React, {Component} from 'react';
import './Card.css';
import cardsData from '../../data/cards';


class Card extends Component {
  flip = (event) => {
    event.target.parentElement.classList.add('translate');
  }
  
  flop = (event) => {
    event.target.firstElementChild.classList.remove('translate');
  }
  
  renderCards = (arr, onCardClick, onBtnClick) => {
    return arr.map((item, index) => {
      const { word, image, translation } = item;    
      return (      
        <div className="card-container" 
             onMouseLeave={(event) => this.flop(event)}
             key={index}>
          <div className="card">
            <div className="front"
                 style={{backgroundImage: `url(${image})`}} 
                 onClick={(event) => onCardClick(event, index)}>
              <div className="card-header">{word}</div>
            </div>
            <div className="back"
                 style={{backgroundImage: `url(${image})`}}>             
              <div className="card-header">{translation}</div>
            </div>
            <div className="rotate"
                 onClick={(event) => this.flip(event)}></div>
          </div>
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