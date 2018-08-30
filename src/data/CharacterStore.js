import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';
import Character from './models/Character';

class CharacterStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap({
      character: new Character({
        name: 'Minion',
        class: 'Slime', 
        max_health: 150, 
        health: 150
      }),
    });
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