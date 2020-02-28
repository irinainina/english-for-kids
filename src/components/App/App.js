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
    step: 1
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
      page: index + 1
    });
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
  
  onCardClick = (index) => {
    this.setState({
      currentCard: index
    });
    if(!this.state.play) {
      this.playCurrentAudio(index);
    } else {
      this.getWinOrError(index);
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
  }
  
  getWinOrError = (index) => {
    const randomItem = this.state.randomArr[this.state.randomArr.length - this.state.step];
    const sound = document.querySelector('.soundEffects');
    const audio = document.querySelector('.audio');
    if(index !== randomItem) {      
      const src= `${errorAudio}`;
      this.playAudio(sound, src);
    } else {
      const src= `${correctAudio}`;
      this.playAudio(sound, src);
      const randomItem = this.state.randomArr[this.state.randomArr.length - this.state.step - 1];    
      const src1= `${cardsData[this.state.page][randomItem].audioSrc}`;
      setTimeout(() => this.playAudio(audio, src1), 500);
      this.setState((prevState, props) => ({
        step: prevState.step + 1
      }));
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
