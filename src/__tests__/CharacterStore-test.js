import Immutable from 'immutable';
import AppActions from '../data/AppActionTypes';
import CharacterStore from '../data/CharacterStore';

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
    const char = state.get('character');
    expect(char.get('water')).toBe(0);
  });

  test('It does not allow food to go less than zero', function() {
    dispatch({
      type: AppActions.REDUCE_FOOD,
      food: 200
    });
    const char = state.get('character');
    expect(char.get('food')).toBe(0);
  });

});