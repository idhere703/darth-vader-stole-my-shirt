import AppView from '../views/AppView';
import { Container } from 'flux/utils';
import AppStore from '../data/AppStore';
import WorldStore from '../data/WorldStore';
import AppActions from '../data/AppActions';
import WorldActions from '../data/WorldActions';

function getStores() {
  return [
    AppStore,
    WorldStore,
  ];
}

function getState() {
  return {
    worldInfo: WorldStore.getState(),
    appInfo: AppStore.getState(),
    openCharSideBar: AppActions.openChar,
    openItemSideBar: AppActions.openItems,
    createWorld: WorldActions.createWorld,
    changeLocation: WorldActions.changeLocation,
    changeFloor: WorldActions.changeFloor,
    setActions: WorldActions.setActions,
    openSubmenu: WorldActions.openSubmenu,
    breadcrumbClicked: WorldActions.breadcrumbClicked
  };
}

export default Container.createFunctional(AppView, getStores, getState);