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
        return state.set('character', reduceProp(state.get('character'), 'food', action.food));
      case AppActionTypes.REDUCE_WATER:
        return state.set('character', reduceProp(state.get('character'), 'water', action.water));
      case AppActionTypes.ADD_ITEMS:
        if (Array.isArray(action.itemsToAdd) === true) {
          return state.updateIn(['character', 'items'], items => {
            items.push(...action.itemsToAdd);
            return items;
          });
        }
        return state;
      default:
        return state;
    }
  }
}

export default new CharacterStore();