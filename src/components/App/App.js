import React, {Component} from 'react';
import './App.css';
import Card from '../Card/Card';
import Header from '../Header/Header';
import cardsData from '../../data/cards';

class App extends Component {
  state = {
    page: 1,
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
  
  playCame = () => {
    this.setState({
      play: true,
    });
    const currentItem = this.state.randomArr[this.state.randomArr.length-this.state.step];
    const audio = document.querySelector('audio');
    audio.src= `${cardsData[this.state.page][currentItem].audioSrc}`; 
    audio.currentTime = 0;
    audio.play();
  }

  getNextPage = (index) => {
    this.setState({
      page: index + 1
    });
  }
  
  render() {
    const { page, play, randomArr, step } = this.state; 
    return (
      <>
        <Header onClick={this.getNextPage}
                page={page} />
        <Card page={page}
              play={play}
              randomArr={randomArr}
              step={step} />
        <div className="btns">      
          <button className="btn"
                  onClick={this.playCame}>
           Play
          </button>
        </div>
        <audio></audio>
      </>
    );
  }
}

export default App;
