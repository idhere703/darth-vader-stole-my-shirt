import AppActions from '../data/AppActionTypes';
import WorldStore from '../data/WorldStore';

let state = {};

describe('WorldStore', function() {

  beforeEach(function() {
    state = WorldStore.getInitialState();

    this.dispatch = (action) => {
      state = WorldStore.reduce(state, action);
    }

    this.dispatch({ type: AppActions.CREATE_WORLD });
  });

  test('Creates game grid', function() {
    const world = state.get('world'); 
    console.dir(world.areas[0].map);
    expect(typeof world === 'object').toBe(true);
    expect(Array.isArray(world.areas)).toBe(true);
    expect(world.areas.length > 0).toBe(true);
  });

});