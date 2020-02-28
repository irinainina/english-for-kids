import React, {Component} from 'react';
import './App.css';
import Card from '../Card/Card';
import Header from '../Header/Header';
import cardsData from '../../data/cards';
import correctAudio from '../../assets/audio/correct.mp3';
import errorAudio from '../../assets/audio/error.mp3';
import successAudio from '../../assets/audio/success.mp3';
import failureAudio from '../../assets/audio/failure.mp3';

class App extends Component {
  state = {
    page: 1,
    currentCard: 0,
    play: false,
    randomArr: [],
    step: 1,
    errors: 0,
    endGame: false
  }

  componentDidMount() {
    this.setState({
      randomArr: this.shuffle([0, 1, 2, 3, 4, 5, 6, 7])
    });
  }

  shuffle = (arr) => {
      var j, temp;
      for(var i = arr.length - 1; i > 0; i--){
          j = Math.floor(Math.random()*(i + 1));
          temp = arr[j];
          arr[j] = arr[i];
          arr[i] = temp;
      }
      return arr;
  }
  
  getNextPage = (index) => {
    this.setState({
      page: index + 1,
      currentCard: 0,
      play: false,
      step: 1,
      errors: 0,
      endGame: false
    });
    const rating = document.querySelector('.rating');
    rating.innerHTML = '';
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => { 
      card.style.color = '#000000';
      card.style.backgroundSize = 'contain';
      card.style.backgroundPosition = 'center top';      if(card.classList.contains('inactive')) {
        card.classList.remove('inactive')
      }
    })
  }

  
  playAudio = (audio, src) => {
    audio.src= src; 
    audio.currentTime = 0;
    audio.play();
  }

  playCurrentAudio = (index) => {
    const audio = document.querySelector('.audio');
    const src= `${cardsData[this.state.page][index].audioSrc}`;
    this.playAudio(audio, src);
  }
  
  onCardClick = (event, index) => {
    if(event.target.classList.contains('inactive')) return;
    this.setState({
      currentCard: index
    });
    if(!this.state.play) {
      this.playCurrentAudio(index);
    } else {
      this.getWinOrError(event,index);
    }
  }
  
  playCame = () => {
    this.setState({
      play: true,
    });
    const randomItem = this.state.randomArr[this.state.randomArr.length - this.state.step];
    const audio = document.querySelector('.audio');
    const src= `${cardsData[this.state.page][randomItem].audioSrc}`;
    this.playAudio(audio, src);
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.style.color = 'transparent';
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center center';
    });
  }
  
  getWinOrError = (event, index) => {
    const randomItem = this.state.randomArr[this.state.randomArr.length - this.state.step];
    const sound = document.querySelector('.soundEffects');
    const audio = document.querySelector('.audio');
    if(index !== randomItem) {      
      const src= `${errorAudio}`;
      this.playAudio(sound, src);
      this.getRating('error');
      this.setState((prevState) => ({
        errors: prevState.errors + 1
      }));
    } else {
      const src= `${correctAudio}`;
      this.playAudio(sound, src);
      event.target.classList.add('inactive');
      this.getRating('succes');
      
      if(this.state.step > 7) {
        setTimeout(() => this.gameEnd('end'), 500);
        setTimeout(() => this.gameEnd('start'), 4000);
        return;
      };
      const randomItem = this.state.randomArr[this.state.randomArr.length - this.state.step - 1];    
      const src1= `${cardsData[this.state.page][randomItem].audioSrc}`;
      setTimeout(() => this.playAudio(audio, src1), 500);
      this.setState((prevState) => ({
        step: prevState.step + 1
      }));       
    }
  }
  
  getRating = (result) => {
    const rating = document.querySelector('.rating');
    const star = document.createElement('div');
    
    if(result === 'succes') {
      star.classList.add('star-succes');      
    } else if(result === 'error') {
      star.classList.add('star-error');
    }
    
    rating.appendChild(star);
  }
  
  gameEnd = (result) => {
    const sound = document.querySelector('.soundEffects');   
    const body = document.querySelector('body');    
    let src;
    const rating = document.querySelector('.rating');
    rating.innerHTML = '';
    rating.style.justifyContent = 'center';
    const container = document.querySelector('.container');
    const btn = document.querySelector('.btn');
    
    if(this.state.errors === 0) {
      body.classList.add('succes');
      src= `${successAudio}`;
      rating.textContent = 'Win!'
    } else {
      body.classList.add('failure');
      src= `${failureAudio}`;
      rating.textContent = `${this.state.errors} errors`
    }
    
    if(result === 'end') {      
      container.style.display = 'none';
      btn.style.display = 'none';
      this.playAudio(sound, src);
    } else if(result === 'start') {
      rating.textContent = '';
      rating.style.justifyContent = 'flex-end';
      body.classList.remove('failure');
      body.classList.remove('succes');
      rating.style.display = 'flex';
      container.style.display = 'flex';
      btn.style.display = 'inline-block';
      this.getNextPage(0);
    }
    
  }

  render() {
    const { page, play } = this.state; 
    return (
      <>
        <Header onClick={this.getNextPage}
                page={page} />
        <div className="rating"></div>
        <Card page={page}
              onCardClick={this.onCardClick} />
        <div className="btns">      
          <button className={play ? "btn repeat" : "btn"}
                  onClick={this.playCame}>
           Play
          </button>
        </div>
        <audio className="audio"></audio>
        <audio className="soundEffects"></audio>
      </>
    );
  }
}

export default App;
