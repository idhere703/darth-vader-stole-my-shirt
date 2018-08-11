import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

class AppStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap({ open: false });
    }

    reduce(state, action) {
        switch (action.type) {
            case AppActionTypes.OPEN_SIDEBAR:
                return state.set('open', action.open);
            default:
                return state;
        }
    }
}

export default new AppStore();