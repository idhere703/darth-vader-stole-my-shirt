import Immutable from 'immutable';
import AppActions from '../data/AppActionTypes';
import WorldStore from '../data/WorldStore';
import { Item } from '../data/models/Item';

function getCurrentArea(world) {
  const areas = world.get('areas');
  const index = areas.findIndex(a => a.floor === world.get('current_floor'));
  return areas[index];
}

function getCurrentLocation(world) {
  const currentArea = getCurrentArea(world);
  const locationIndex = currentArea.get('current_location');
  return currentArea.get('map')[locationIndex[0]][locationIndex[1]];
}

function getMovementOptions(map, currentLocation) {
  const possibleOptions = [
    [currentLocation[0] + 1, currentLocation[1]],
    [currentLocation[0] - 1, currentLocation[1]],
    [currentLocation[0], currentLocation[1] + 1],
    [currentLocation[0], currentLocation[1] - 1],
  ];
  return possibleOptions.filter(o => {
    return map[o[0]] !== undefined && map[o[0]][o[1]] !== 1;
  });
}

describe('World', function() {
  let state = Immutable.OrderedMap();
  function dispatch(action) {
    state = WorldStore.reduce(state, action);
  }

  beforeAll(function() {
    dispatch({ type: AppActions.CREATE_WORLD });
  });

  test('Creates game grid with at least one area', function() {
    const world = state.get('world'); 
    expect(typeof world === 'object').toBe(true);
    expect(Array.isArray(world.areas)).toBe(true);
    expect(world.areas.length > 0).toBe(true);
  });

  test('Starts character off in a safe zone', function() {
    const world = state.get('world');
    const location = getCurrentLocation(world);
    expect(location.get('safe_zone')).toBe(true);
  });

  test('Safe zone has no enemies', function() {
    const world = state.get('world');
    const location = getCurrentLocation(world);
    expect(location.get('safe_zone')).toBe(true);
    expect(location.get('enemies').length > 0).toBe(false);
  });
  
  test('Only allows movement to a valid space in the game grid', function() {
    const world = state.get('world');
    const area = getCurrentArea(world);
    const expected = area.get('current_location');
    dispatch({
      type: AppActions.CHANGE_LOCATION,
      newLocation: [-1, -1]
    });
    expect(area.get('current_location')).toBe(expected);
  });

  test('Updates current location on movement', function() {
    const world = state.get('world');
    const area = getCurrentArea(world);
    const expected = area.get('current_location');
    const options = getMovementOptions(area.get('map'), expected);
    dispatch({
      type: AppActions.CHANGE_LOCATION,
      newLocation: options[0]
    });
    expect(area.get('current_location')).toBe(expected);
  });

  test('Degrades food items in inventory on movement', function() {
    expect(true).toBe(false);
  });
  test('Preserves food items in special inventory on movement', function() {
    expect(true).toBe(false);
  });
  test('Subtracts food and water cost from character on movement', function() {
    expect(true).toBe(false);
  });
});




describe('Character', function() {
  let state = Immutable.OrderedMap();

  function dispatch(action) {
    state = WorldStore.reduce(state, action);
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

  test('It adds items to the user inventory', function() {
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

  test('It removes items from the user inventory', function() {
    const oldItems = state.getIn(['character', 'items']);
    dispatch({
      type: AppActions.REMOVE_ITEMS,
      itemsToRemove: []
    });

    const items = state.getIn(['character', 'items']);
    expect(items.length).toBeLessThan(oldItems.length);
  });

});