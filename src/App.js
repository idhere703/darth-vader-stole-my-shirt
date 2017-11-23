import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Utils from './components/utils';


class App extends Component {
  componentDidMount() {
    Utils.showText('#header', `A better website.`, 0, 100);
    setTimeout(() => {
      Utils.showText('#bullcrap', `And it loads so quickly!`, 0, 100);
    }, 1800);

    $(document).keyup((evt) => {
      // Spacebar.
      if (evt.keyCode === 32) {
        console.log('Space?')
      }
    });

  }

  render() {
    return (
      <div>
        <h1 id="header"></h1>
        <p id="bullcrap"></p>
      </div>
      );
  }
}

export default App;
