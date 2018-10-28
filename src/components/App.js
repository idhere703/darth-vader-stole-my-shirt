import React from 'react';
import WorldContainer from '../containers/World';
import HeaderTitle from '../res/titleDivider0.png';
import TitleImgWrapper from './views/TitleImg';

function AppView() {
  return (
    <div>
      <header>
        <h1 id="header" className="app__header">Minion</h1>
        <div className="app__title--container">
          <TitleImgWrapper
            src={HeaderTitle}
            classes="app__title--img"
          />
        </div>
      </header>
      <aside />
      <main>
        <WorldContainer />
      </main>
    </div>
  );
}

export default AppView;
