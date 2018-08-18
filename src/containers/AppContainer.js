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
    world: WorldStore.getState(),
    appInfo: AppStore.getState(),
    character: CharacterStore.getState(),
    openCharSideBar: AppActions.openChar,
    openItemSideBar: AppActions.openItems
  };
}

export default Container.createFunctional(AppView, getStores, getState);