import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

class WorldStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {
            case AppActionTypes.CREATE_WORLD:
                // Do nothing for now. But soon...
                return state;

            default:
                return state;
        }
    }
}

export default new WorldStore();