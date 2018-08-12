import React from 'react';
import WorldView from './WorldView';
import HeaderTitle from '../res/titleDivider0.png';
import CharacterTitle from '../res/characterDivider.png';
import styles from './components/styles/React-Sidebar-Styles';
import TitleImgWrapper from './components/TitleImg';
import Sidebar from './components/Sidebar';

function AppView(props) {
  const charSideBarContent = <CharacterSidebar />;
  return (
      <div>
        <h1 id="header" className="app__header">Darth Vader Stole My Shirt</h1>
        <div className='app__title--container'><TitleImgWrapper src={HeaderTitle} classes='app__title--img' /></div>
        <div className='app__sidebar--character'>
          <Sidebar
            content={charSideBarContent}
            onSetSidebarOpen={props.openSideBar}
            sidebarOpen={props.appInfo.get('open')} 
            isRight={true}
            styles={styles}
          >
              <CharacterLink onSetSidebarOpen={props.openSideBar} />
          </Sidebar>
        </div>
        {/* <div className='app__sidebar--items'>
          <Sidebar
            onSetSidebarOpen={props.openSideBar}
            sidebarOpen={props.appInfo.get('open')}
            isRight={true}
            styles={styles} />
        </div> */}
        <WorldView { ...props } />
      </div>
      );
}

function CharacterLink(props) {
  return (
    <div className='app__sidebar--char-link'>
      <div onClick={() => props.onSetSidebarOpen(true)}>
        Character
      </div>
      <TitleImgWrapper src={CharacterTitle} classes={'app__sidebar--character-divider'} />
    </div>
  );
}



function CharacterSidebar(props) {
  return (
    <div className='character__container'> 
      <b>Sidebar content</b>
    </div>
  );
}

export default AppView;
