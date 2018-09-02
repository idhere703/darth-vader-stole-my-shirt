import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

class AppStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap({});
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.OPEN_CHAR_SIDEBAR:
        return state.set('char_open', action.open);
      case AppActionTypes.OPEN_ITEM_SIDEBAR:
        return state.set('item_open', action.open);
      default:
        return state;
    }
  }
}

export default new AppStore();