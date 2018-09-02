import React from 'react';
import WorldView from './WorldView';
import HeaderTitle from '../res/titleDivider0.png';
import TitleImgWrapper from './components/TitleImg';

function AppView(props) {
  const worldRendered = props.worldInfo.get('world');
  return (
    <div>
      <header>
        <h1 id="header" className="app__header">Minion</h1>
        <div className='app__title--container'><TitleImgWrapper src={HeaderTitle} classes='app__title--img' /></div>
      </header>
      <aside>
      </aside>
      <main>
        { (worldRendered) && <WorldView { ...props } /> } 
      </main>
    </div>
  );
}

export default AppView;
