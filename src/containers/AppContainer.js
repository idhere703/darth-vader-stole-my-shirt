import AppView from '../views/AppView';
import { Container } from 'flux/utils';
import AppStore from '../data/AppStore';
import WorldStore from '../data/WorldStore';
import CharacterStore from '../data/CharacterStore';
import AppActions from '../data/AppActions';

function getStores() {
  return [
    AppStore,
    WorldStore,
    CharacterStore
  ];
}

function getState() {
  return {
    worldInfo: WorldStore.getState(),
    appInfo: AppStore.getState(),
    characterInfo: CharacterStore.getState(),
    openCharSideBar: AppActions.openChar,
    openItemSideBar: AppActions.openItems,
    createWorld: AppActions.createWorld
  };
}

export default Container.createFunctional(AppView, getStores, getState);