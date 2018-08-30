import Immutable from 'immutable';
import AppActions from '../data/AppActionTypes';
import WorldStore from '../data/WorldStore';


function getCurrentLocation(world) {
  const areas = world.get('areas');
  const currentArea = areas[world.get('current_floor')];
  const locationIndex = currentArea.get('current_location');
  return currentArea.get('map')[locationIndex[0]][locationIndex[1]];
}

describe('WorldStore', function() {
  let state = {};

  beforeAll(function() {
    state = Immutable.OrderedMap();
    this.dispatch = (action) => {
      state = WorldStore.reduce(state, action);
    }

    this.dispatch({ type: AppActions.CREATE_WORLD });
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
  
  test('Only allows movement to a valid space in the game grid', function() {});
  test('Updates current location on movement', function() {});
  test('Degrades food items in inventory on movement', function() {});
  test('Preserves food items in special inventory on movement', function() {});
  test('Subtracts food and water cost from character on movement', function() {});
});