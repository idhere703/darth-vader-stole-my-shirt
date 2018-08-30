import AppActions from '../data/AppActionTypes';
import WorldStore from '../data/WorldStore';

describe('WorldStore', function() {
  let state = {};

  beforeAll(function() {
    state = WorldStore.getInitialState();

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

  test('Starts character off in a safe zone', function() {});
  test('Safe zone has no enemies', function() {});
  test('Only allows movement to a valid space in the game grid', function() {});
  test('Updates current location on movement', function() {});
  test('Degrades food items in inventory on movement', function() {});
  test('Preserves food items in special inventory on movement', function() {});
  test('Subtracts food and water cost from character on movement', function() {});
});