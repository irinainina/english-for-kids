import React, {Component} from 'react';
import './Card.css';
import cardsData from '../../data/cards';

class Card extends Component {
  flip = (event) => {
    event.target.parentElement.classList.add('translate');
  }
  
  flop = (event) => {
    const target = event.target.firstElementChild;
    if(target && target.classList.contains('translate')) {
     target.classList.remove('translate');
   }
  }
  
  deleteClass = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if(!card.querySelector(':hover') && card.classList.contains('translate')) {
        card.classList.remove('translate')
      }
    })
  }
  
  renderCards = (arr, onCardClick, onBtnClick, play,playActive) => {
    return arr.map((item, index) => {
      const { word, image, translation } = item;    
      return (      
        <div className="card-container" 
             onMouseOver={this.deleteClass}
             onMouseLeave={(event) => this.flop(event)}
             key={index}>
          <div className={play ? "card card-cover" : "card"}>
            <div className="front"
                 style={{backgroundImage: `url(${image})`}} 
                 onMouseOver={this.deleteClass}
                 onClick={(event) => onCardClick(event, index)}>
              <div className={play ? "card-header none" : "card-header"} >
                {word}
              </div>              
            </div>
            <div className="back"
                 style={{backgroundImage: `url(${image})`}}>             
              <div className={play ? "card-header none" : "card-header"}>
                {translation}
              </div>              
            </div>
            <div className={play ? "rotate none" : "rotate"}
                 onClick={(event) => this.flip(event)}>
            </div>
          </div>
        </div>
      );
    });
  }

  render() { 
    const {page, onCardClick, onBtnClick, play, playActive} = this.props;
    const cards = this.renderCards(cardsData[page], onCardClick, onBtnClick, play, playActive);
      return (
       <div className="container">
        <h2 className={play ? "card-title" : "card-title green"}>{page > 0 ? cardsData[0][page - 1].category : ''}</h2>
        <div className={(play && playActive) ? "rating" : "rating none" } ></div>
          {cards}
          <div className="btns">      
            <button className={play ? "btn" : "btn none"}
                    onClick={(event) => onBtnClick(event)} >
           Start game
          </button>
        </div>
        <audio className="audio"></audio>
        <audio className="soundEffects"></audio>
       </div>
      )
    }
  }

export default Card;