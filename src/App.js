import React, { Component } from 'react';
import './App.css';
import Utils from './components/utils';
import Calendar from './components/calendar';


class App extends Component {
  componentDidMount() {
    Utils.showText('#header', `A better website.`, 0, 100);
    setTimeout(() => {
      Utils.showText('#bullcrap', `And it loads so quickly!`, 0, 100);
    }, 1800);
  }

  render() {
    return (
      <div>
        <h1 id="header"></h1>
        <p id="bullcrap"></p>
        <img alt="gif" src="https://media.giphy.com/media/Su4ZK5TTfTKQo/giphy.gif" />
        <Calendar />
      </div>
      );
  }
}

export default App;
