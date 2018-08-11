import AppView from '../views/AppView';
import { Container } from 'flux/utils';
import WorldStore from '../data/WorldStore';

function getStores() {
    return [
        WorldStore,
    ];
}

function getState() {
    return {
        world: WorldStore.getState(),
    };
}

export default Container.createFunctional(AppView, getStores, getState);