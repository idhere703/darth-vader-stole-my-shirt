import React, { Component } from 'react';
import Utils from './components/utils';
import './App.css';

class App extends Component {
  componentDidMount() {
    Utils.showText('#header', `This is so slow!`, 0, 100);
    setTimeout(() => {
      Utils.showText('#bullcrap', `I did this purposely to waste your time.          Boo!`, 0, 100);
    }, 1800);
  }

  render() {
    return (
      <div>
        <h1 id="header"></h1>
        <p id="bullcrap"></p>
        <div id="g-window" className="g-window">
          <div id="content" className="g-window__content">
            This is some content. I was going to mess around with it. We'll see how it goes.
          </div>
        </div>
      </div>
      );
  }
}

export default App;
