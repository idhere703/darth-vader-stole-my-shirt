import Immutable from 'immutable';
import AppActions from '../data/AppActionTypes';
import CharacterStore from '../data/CharacterStore';
import { Item } from '../data/models/Item';

describe('CharacterStore', function() {
  let state = Immutable.OrderedMap();

  function dispatch(action) {
    state = CharacterStore.reduce(state, action);
  }

  beforeAll(function() {
    dispatch({
      type: AppActions.CREATE_CHARACTER,
      seed: {
        name: 'Minion',
        class: 'Slime',
        max_health: 150,
        health: 150,
        max_food: 100,
        food: 100,
        max_water: 100,
        water: 100
      }
    });
  })

  test('It creates a character with more than zero health', function() {
    const char = state.get('character');
    expect(char.get('health')).toBeGreaterThan(0);
  });

  test('It does not allow water to go less than zero', function() {
    dispatch({
      type: AppActions.REDUCE_WATER,
      water: 200
    });
    expect(state.getIn(['character', 'water'])).toBe(0);
  });

  test('It does not allow food to go less than zero', function() {
    dispatch({
      type: AppActions.REDUCE_FOOD,
      food: 200
    });
    expect(state.getIn(['character', 'food'])).toBe(0);
  });

  test('It adds items to the users inventory', function() {
    const oldItemLength = state.getIn(['character', 'items']).length;
    const item = new Item();
    dispatch({
      type: AppActions.ADD_ITEMS,
      itemsToAdd: [item]
    });

    const items = state.getIn(['character', 'items']);
    expect(items.length).toBeGreaterThan(oldItemLength);
    expect(items).toContain(item);
  });

});