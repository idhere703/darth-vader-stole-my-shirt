import React from 'react';
import WorldView from './WorldView';
import HeaderTitle from '../res/titleDivider0.png';

function AppView(props) {
    return (
        <div>
          <h1 id="header" className="app__header">Darth Vader Stole My Shirt</h1>
          <div className='app__title--container'><TitleImg src={HeaderTitle} classes='app__title--img' /></div>
          <WorldView { ...props } />
        </div>
        );
}


function TitleImg(props) {
  return (
    <img className={props.classes} src={props.src} />
  );
}

export default AppView;
