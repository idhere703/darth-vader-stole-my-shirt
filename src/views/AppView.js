import React from 'react';
import WorldView from './WorldView';
import HeaderTitle from '../res/titleDivider0.png';
// import CharacterTitle from '../res/characterDivider.png';
// import styles from './components/styles/React-Sidebar-Styles';
import TitleImgWrapper from './components/TitleImg';
// import Sidebar from './components/Sidebar';

function AppView(props) {
  return (
    <div>
      <header>
        <h1 id="header" className="app__header">Darth Vader Stole My Shirt</h1>
        <div className='app__title--container'><TitleImgWrapper src={HeaderTitle} classes='app__title--img' /></div>
      </header>
      <aside>
        {/* <section className='app__sidebar--character'>
          <Sidebar
            content={charSideBarContent}
            onSetSidebarOpen={props.openCharSideBar}
            sidebarOpen={props.appInfo.get('char_open')} 
            isRight={true}
            styles={styles}
          >
            <CharacterLink onSetSidebarOpen={props.openCharSideBar} />
          </Sidebar>
        </section> */}
      </aside>
      <main>
        <WorldView { ...props } />
      </main>
    </div>
  );
}

// function CharacterLink(props) {
//   return (
//     <div className='app__sidebar--char-link'>
//       <div onClick={() => props.onSetSidebarOpen(true)}>
//         Character
//       </div>
//       <TitleImgWrapper src={CharacterTitle} classes={'app__sidebar--character-divider'} />
//     </div>
//   );
// }

export default AppView;
