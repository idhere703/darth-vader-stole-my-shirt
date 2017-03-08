import React, { Component } from 'react';
import './App.css';
import Page from './components/Page/Page';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        {/*<Sidebar></Sidebar>*/}
        <div className="App">
          <Page></Page>
        </div>
      </div>

    );
  }
}

export default App;
