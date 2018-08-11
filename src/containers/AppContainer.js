import AppView from '../views/AppView';
import { Container } from 'flux/utils';
import NavStore from '../data/NavStore';

function getStores() {
    return [
        NavStore,
    ];
}

function getState() {
    return {
        world: NavStore.getState(),
    };
}

export default Container.createFunctional(AppView, getStores, getState);