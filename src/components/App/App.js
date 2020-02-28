import React, {Component} from 'react';
import './App.css';
import Card from '../Card/Card';
import Header from '../Header/Header';
import cardsData from '../../data/cards';
// import correctAudio from '../../assets/audio/correct.mp3';

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
  
  playAudio(src) {
    const audio = document.querySelector('.audio');
    audio.src= src; 
    audio.currentTime = 0;
    audio.play();
  }
  
  onCardClick = (index) => {
    this.setState({
      currentCard: index
    });
    if(!this.state.play) {
      const src= `${cardsData[this.state.page][index].audioSrc}`;
      this.playAudio(src);
    }
  }
  
  playCame = () => {
    this.setState({
      play: true,
    });
    const randomItem = this.state.randomArr[this.state.randomArr.length - this.state.step]; 
    const src= `${cardsData[this.state.page][randomItem].audioSrc}`;
    this.playAudio(src);
  }

  render() {
    const { page } = this.state; 
    return (
      <>
        <Header onClick={this.getNextPage}
                page={page} />
        <Card page={page}
              onCardClick={this.onCardClick} />
        <div className="btns">      
          <button className="btn"
                  onClick={this.playCame}>
           Play
          </button>
        </div>
        <audio className="audio"></audio>
      </>
    );
  }
}

export default App;
