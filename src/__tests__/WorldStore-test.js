import { createStore } from 'redux';
import rootReducer from '../data/reducers';
import { Item } from '../data/models/Item';
import Character from '../data/models/Character';
import { changeLocationAction, removeItems, addItems } from '../data/actions';
import {
  getMovementOptions, getCurrentArea, getCurrentLocation, levelUp, attackCharacter
} from '../utils';

const WorldStore = createStore(rootReducer);

describe('World', () => {
  const state = WorldStore.getState();

  test('Creates game grid with at least one area', () => {
    const world = state.get('world');
    expect(typeof world === 'object').toBe(true);
    expect(Array.isArray(world.areas)).toBe(true);
    expect(world.areas.length > 0).toBe(true);
  });

  test('Creates each area with at least one exit', () => {
    const world = state.get('world');
    world.areas.forEach((area) => {
      const map = area.get('map');
      const exit = map.find((row) => {
        const containsExit = row.find((col) => {
          if (col.exit === true) {
            return true;
          }
          return false;
        });
        return containsExit;
      });
      expect(exit).not.toBeFalsy();
    });
  });

  test('Starts character off in a safe zone', () => {
    const world = state.get('world');
    const location = getCurrentLocation(getCurrentArea(world));
    expect(location.get('safe_zone')).toBe(true);
  });

  test('Safe zone has no enemies', () => {
    const world = state.get('world');
    const location = getCurrentLocation(getCurrentArea(world));
    expect(location.get('safe_zone')).toBe(true);
    expect(location.get('enemies').length > 0).toBe(false);
  });

  test('Only allows movement to a valid space in the game grid', () => {
    const world = state.get('world');
    const area = getCurrentArea(world);
    const expected = area.get('current_location');
    WorldStore.dispatch(changeLocationAction([-1, -1]));
    expect(area.get('current_location')).toBe(expected);
  });

  test('Updates current location on movement', () => {
    const world = state.get('world');
    const area = getCurrentArea(world);
    const expected = area.get('current_location');
    const options = getMovementOptions(area.get('map'), expected);
    WorldStore.dispatch(changeLocationAction(options[0]));
    expect(area.get('current_location')).toBe(expected);
  });

  test('Degrades food items in inventory on movement', () => {
    expect(true).toBe(false);
  });
  test('Preserves food items in special inventory on movement', () => {
    expect(true).toBe(false);
  });
  test('Subtracts food and water cost from character on movement', () => {
    expect(true).toBe(false);
  });
  test('Removed food items with zero food unless they have a water value', () => {
    expect(true).toBe(false);
  });
});


describe('Character', () => {
  const state = WorldStore.getState();

  test('It creates a character with more than zero health', () => {
    const char = state.get('character');
    expect(char.get('health')).toBeGreaterThan(0);
  });

  test('It adds items to the user inventory', () => {
    const oldItemLength = state.getIn(['character', 'items']).length;
    const item = new Item();
    WorldStore.dispatch(addItems([item]));
    const items = state.getIn(['character', 'items']);
    expect(items.length).toBeGreaterThan(oldItemLength);
    expect(items).toContain(item);
  });

  test('It fails to add items greater than the inventory limit', () => {
    const item = new Item();
    const oldItemLength = state.getIn(['character', 'items']).length;
    WorldStore.dispatch(addItems([item, item, item, item, item, item]));
    const items = state.getIn(['character', 'items']);
    expect(items.length).toBe(oldItemLength);
  });

  test('It removes items from the user inventory', () => {
    const oldItems = state.getIn(['character', 'items']);
    WorldStore.dispatch(removeItems([]));
    const items = state.getIn(['character', 'items']);
    expect(items.length).toBeLessThan(oldItems.length);
  });

  test('It levels up the character and adds additional skill points', () => {
    const character = state.get('character');
    const newChar = levelUp(character.set('experience_points', character.get('needed_exp')));
    expect(newChar.get('level')).toBeGreaterThan(character.get('level'));
    expect(newChar.get('skill_points')).toBeGreaterThan(character.get('skill_points'));
  });

  test('Should return a target with reduced health', () => {
    const character = state.get('character');
    const enemy = new Character();
    const enemyAfterAttack = attackCharacter(character, enemy, {
      attType: 'basic',
      baseHit: 10000 // HACK: To ensure we get the same result every time.
    });
    expect(enemyAfterAttack.get('health')).toBeLessThan(enemy.get('health'));
  });

  test('Should return a new state object without a killed enemy', () => {
  });
  test('Should return a new state object with killed enemy drops', () => {
  });
});
