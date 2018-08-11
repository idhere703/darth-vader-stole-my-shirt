import AppView from '../views/AppView';
import { Container } from 'flux/utils';
import WorldStore from '../data/WorldStore';
import AppStore from '../data/AppStore';
import AppActions from '../data/AppActions';

function getStores() {
    return [
        AppStore,
        WorldStore
    ];
}

function getState() {
    return {
        world: WorldStore.getState(),
        appInfo: AppStore.getState(),
        openSideBar: AppActions.openSidebar
    };
}

export default Container.createFunctional(AppView, getStores, getState);