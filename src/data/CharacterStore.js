import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';
import Character from './models/Character';
import { Item } from './models/Item';

// Reduce passed prop to no less than zero.
function reduceProp(character, prop, newVal) {
  if (character && prop && typeof newVal === 'number') {
    const newProp = character.get(prop) - newVal;
    if (newProp < 0) character = character.set(prop, 0);
    else character = character.set(prop, newProp);
  }
  return character
}

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
        health: 150,
        items: [new Item(), new Item()],
        dimensional_items: [new Item()]
      }),
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.CREATE_CHARACTER:
        return state.set('character', new Character(action.seed));
      case AppActionTypes.REDUCE_FOOD:
        const newFoodChar = reduceProp(state.get('character'), 'food', action.food);
        return state.set('character', newFoodChar);
      case AppActionTypes.REDUCE_WATER:
        const newWaterChar = reduceProp(state.get('character'), 'water', action.water);
        return state.set('character', newWaterChar);
      case AppActionTypes.ADD_CHARACTER_ITEMS:
        return state.set();
      default:
        return state;
    }
  }
}

export default new CharacterStore();