import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

class CharacterStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.CREATE_CHARACTER:
        return state;

      default:
        return state;
    }
  }
}

export default new CharacterStore();