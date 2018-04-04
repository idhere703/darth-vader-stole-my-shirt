import React, { Component } from 'react';
import Utils from './components/utils';
import levels from './data/levels';
console.log(levels);
import './App.css';

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      Utils.showText('#content', `Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....`, 0, 10);
    }, 1800);
  }

  render() {
    return (
      <div>
        <h1 id="header" className="header">Darth Vader Stole My Shirt</h1>
        <p id="bullcrap"></p>
        <div id="g-window" className="g-window">
          <div id="content" className="g-window__content">
          </div>
        </div>
      </div>
      );
  }
}

export default App;
