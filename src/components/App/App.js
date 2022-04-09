import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Card from '../Card/Card';
import Header from '../Header/Header';
import MainPage from '../MainPage/MainPage';
import Switch from '../Switch/Switch';
import cardsData from '../../data/cards';
import correctAudio from '../../assets/audio/correct.mp3';
import errorAudio from '../../assets/audio/error.mp3';
import successAudio from '../../assets/audio/success.mp3';
import failureAudio from '../../assets/audio/failure.mp3';

class App extends Component {
  state = {
    page: 0,
    currentCard: 0,
    play: false,
    playActive: false,
    randomArr: [],
    step: 1,
    errors: 0,
    endGame: false
  }

  componentDidMount() {
    this.setState({
      randomArr: this.shuffle([0, 1, 2, 3, 4, 5, 6, 7]),
      endGame: true
    });
  }

  shuffle = (arr) => {
      let j, temp;
      for(let i = arr.length - 1; i > 0; i--){
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
      randomArr: this.shuffle([0, 1, 2, 3, 4, 5, 6, 7]),
      currentCard: 0,
      step: 1,
      errors: 0,
      playActive: false,
      endGame: false
    }); 
    const fronts = document.querySelectorAll('.front');
    fronts.forEach(front => { 
      if(front.classList.contains('inactive')) {
        front.classList.remove('inactive')
      }
    });
    const rating = document.querySelector('.rating');
    if(rating) {
      rating.innerHTML = '';
    } 
    const btn = document.querySelector('.btn');
    if(btn && btn.classList.contains('repeat')) {
      btn.classList.remove('repeat');
    }
  }
  
  playAudio = (audio, src) => {
    audio.src= src; 
    audio.currentTime = 0;
    audio.play();
  }

  playCurrentAudio = (index) => {
    const audio = document.querySelector('.audio');
    const src= `https://wooordhunt.ru/data/sound/sow/us/${cardsData[this.state.page][index].word}.mp3`;
    console.log(src);
    this.playAudio(audio, src);
  }
  
  onCardClick = (event, index) => {
    if(event.target.classList.contains('inactive')) return;
    this.setState({
      currentCard: index
    });
    if(!this.state.play) {
      this.playCurrentAudio(index);
    } else if(this.state.play && this.state.playActive) {
      this.getWinOrError(event,index);
    } 
  }
  
  playCame = (event) => {
    if(!event.target.classList.contains('repeat')) {
      event.target.classList.add('repeat');
    }
    this.setState({
      playActive: true
    });
    const randomItem = this.state.randomArr[this.state.randomArr.length - this.state.step];
    const audio = document.querySelector('.audio');
    const src= `https://wooordhunt.ru/data/sound/word/us/mp3/${cardsData[this.state.page][randomItem].word}.mp3`;
    this.playAudio(audio, src);
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
        setTimeout(() => this.gameEnd('end'), 1000);
        setTimeout(() => this.gameEnd('start'), 4000);
        return;
      };
      const randomItem = this.state.randomArr[this.state.randomArr.length - this.state.step - 1]; 
      const src1 = `https://wooordhunt.ru/data/sound/word/us/mp3/${cardsData[this.state.page][randomItem].word}.mp3`; 
      setTimeout(() => this.playAudio(audio, src1), 1000);
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
    rating.style.justifyContent = 'center';
    const cards = document.querySelectorAll('.card');
    const btn = document.querySelector('.btn');
    const switchContainer = document.querySelector('.switch-container');
    const cardTitle = document.querySelector('.container h2');
    
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
      cards.forEach(card => card.style.display = 'none'); 
      btn.style.display = 'none';
      switchContainer.style.display = 'none';
      cardTitle.style.display = 'none';
      this.playAudio(sound, src);
    } else if(result === 'start') {
      rating.textContent = '';
      rating.style.justifyContent = 'flex-end';
      cardTitle.style.display = 'block';
      body.classList.remove('failure');
      body.classList.remove('succes');
      rating.style.display = 'flex';
      cards.forEach(card => card.style.display = 'flex');
      btn.style.display = 'inline-block';
      switchContainer.style.display = 'block';
      this.setState({ 
        endGame: true,
        playActive: false,
        page: 0
      });
    }   
  }

  closeMenu = (event) => {
    const input = document.querySelector('.menuToggle input');
    const menu = document.querySelector('.menu');
    if(event.target !== input && event.target !== menu) {
      input.checked = false;
    }
  }
  
  onHeaderClick = () => {
    this.setState({
      playActive: false,
      page: 0
    });
 }
  
  onSwitchChange = () => {
    this.setState((prevState) => ({
      play: !prevState.play,
      randomArr: this.shuffle([0, 1, 2, 3, 4, 5, 6, 7]),
      step: 1,
      playActive: false,
      errors: 0
    }));
    const fronts = document.querySelectorAll('.front');
    fronts.forEach(front => { 
      if(front.classList.contains('inactive')) {
        front.classList.remove('inactive')
      }
    });
    const rating = document.querySelector('.rating');
    if(rating) {
      rating.innerHTML = '';
    }    
  }
  
  render() {
    const { page, play, playActive, endGame } = this.state; 
    if(endGame) 
    return (
      <div className="app-container" 
           onClick={(event) => this.closeMenu(event)}>
      <div className="header-container">
        <Header onClick={this.getNextPage}
                onHeaderClick={this.onHeaderClick}
                page={page} 
                play={play} />
        <Switch play={play}
                onSwitchChange={this.onSwitchChange} />
      </div>
      <MainPage onClick={this.getNextPage}
                page={page}
                play={play} />
      </div>
    );
    
    return (
      <div className="app-container" 
           onClick={(event) => this.closeMenu(event)}>
      <div className="header-container">
        <Header onClick={this.getNextPage}
                onHeaderClick={this.onHeaderClick}
                page={page} 
                play={play} />
        <Switch play={play}
                onSwitchChange={this.onSwitchChange} />
      </div>
        <Route
          path={'/'}
          render={() => <MainPage onClick={this.getNextPage}
            page={page} 
            play={play} />}
          exact
        />
        <Route
          path={'/cards'}
          render={() => <Card page={page}
          play={play}
          playActive={playActive}
          onCardClick={this.onCardClick}
          onBtnClick={(event) => this.playCame(event)} />}
          exact
        />
      </div>
    );
  }
}

export default App;
