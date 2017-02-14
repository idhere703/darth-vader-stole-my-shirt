import React, { Component } from 'react';
import './App.css';
import Page from './components/Page/Page';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="App">
          <Page></Page>
        </div>
      </div>

    );
  }
}

export default App;
