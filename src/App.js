import React, { Component } from 'react';
import './App.css';
import Utils from './components/utils';


class App extends Component {
  componentDidMount() {
    Utils.showText('#header', `A better website.`, 0, 100);
    Utils.showText('#bullcrap', `And it loads so quickly!`, 0, 100);
    Utils.showText('#morelies', `Look how few styles are on this!`, 0, 100);
  }

  render() {
    return (
      <div>
        <h1 id="header"></h1>
        <p id="bullcrap"></p>
        <h2 id="morelies"></h2>
      </div>
      );
  }
}

export default App;
