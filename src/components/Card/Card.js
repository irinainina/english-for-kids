import React, {Component} from 'react';
import './Card.css';
import cardsData from '../../data/cards';
import correctAudio from '../../assets/audio/correct.mp3';

const onClick = (event, play, randomArr, step, index) => {
  if(play) {
    const currentItem = randomArr[randomArr.length-step];
    console.log(currentItem);
    if(index === currentItem) {
      console.log('win');
      const audio = document.querySelector('.sound');
      audio.src= `${correctAudio}`;
      audio.currentTime = 0;
      audio.play();
      step += 1;
    }
  } else { 
    const audio = event.target.lastChild;
    audio.currentTime = 0;
    audio.play();
  }
}

const renderCards = (arr, play, randomArr, step) => {
  return arr.map((item, index) => {
    const { word, image, audioSrc } = item;    
    return (      
      <div className="card"
         style={{backgroundImage: `url(${image})`}}
          key={word} 
          onClick={(event) => onClick(event, play, randomArr, step, index)} >
        <div className="card-header">{word}</div>
        <audio src={audioSrc} ></audio>
      </div>
    );
  });
}

class Card extends Component {
  render() {
    const {page, play, randomArr, step} = this.props;
    const cards = renderCards(cardsData[page], play, randomArr, step);
      return (
       <div className="container">
        {cards}
        <audio className="sound"></audio>
       </div>
      )
    }
  }

export default Card;