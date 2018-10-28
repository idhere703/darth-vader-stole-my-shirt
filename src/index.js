import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './data/reducers';
import './css/index.css';
import './css/app.css';
import './css/world.css';
import './css/character.css';

const store = createStore(rootReducer);

export default ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
