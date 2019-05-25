import Immutable from 'immutable';
import AppActionTypes from '../actions/AppActionTypes';
import World from '../models/World';
import Area from '../models/Area';
import Location from '../models/Location';
import Character from '../models/Character';
import { Item, ItemType } from '../models/Item';
import {
  getCurrentArea, setActions, buildRoomDescription, changeLocation, levelUp, basicAttack
} from '../../utils';

function createLocation(location = {}, event) {
  if (typeof event === 'object' && event !== null) return new Location(Immutable.mergeDeep(location, event));
  // TODO: Build random location information.
  return new Location(location);
}

// Helper function to make a two dimentional array that
// takes a number and the dimentions of the array.
function createArray(num, dimensions) {
  const array = [];
  for (let i = 0; i < dimensions; i++) {
    array.push([]);
    for (let j = 0; j < dimensions; j++) {
      array[i].push(num);
    }
  }
  return array;
}

/**
   * @param {Number} dimensions Width and height of the map.
   * @param {Number} maxTunnels Max number of tunnels possible
   * @param {Number} maxLength Max length each tunnel can have
   * @returns {Array} Array of location objects.
*/
function createMap(dimensions = 20, maxTunnels = 50, maxLength = 8) {
  const map = createArray(1, dimensions);
  // create a 2d array full of 1's
  let currentRow = Math.floor(Math.random() * dimensions);
  // our current row - start at a random spot
  let currentColumn = Math.floor(Math.random() * dimensions);
  // our current column - start at a random spot
  let current_location = [0, 0];
  let last_room = null;
  let charSet = false;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  // array to get a random direction from (left,right,up,down)
  let lastDirection = [];
  // save the last direction we went
  let randomDirection; // next turn/direction - holds a value from directions

  // lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
  while (maxTunnels && dimensions && maxLength) {
    // lets get a random direction - until it is a perpendicular to our lastDirection
    // if the last direction = left or right,
    // then our new direction has to be up or down,
    // and vice versa
    do {
      randomDirection = directions[Math.floor(Math.random() * directions.length)];
    } while (
      (randomDirection[0] === -lastDirection[0]
      && randomDirection[1] === -lastDirection[1])
      || (randomDirection[0] === lastDirection[0]
      && randomDirection[1] === lastDirection[1]
      )
    );

    const randomLength = Math.ceil(Math.random() * maxLength);
    // length the next tunnel will be (max of maxLength)

    let tunnelLength = 0; // current length of tunnel being created

    // lets loop until our tunnel is long enough or until we hit an edge
    while (tunnelLength < randomLength) {
      // break the loop if it is going out of the map
      if (((currentRow === 0) && (randomDirection[0] === -1))
        || ((currentColumn === 0) && (randomDirection[1] === -1))
        || ((currentRow === dimensions - 1) && (randomDirection[0] === 1))
        || ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
        break;
      } else {
        last_room = [currentRow, currentColumn]; // Set last room so we can set the exit.
        // TODO: Figure out events and passing them into create location.
        if (charSet === false) {
          // Set initial character location. Make it a safe zone with no enemies.
          map[currentRow][currentColumn] = createLocation({
            safe_zone: true,
            enemies: [],
            id: 'spawn'
          });
          current_location = [currentRow, currentColumn];
          charSet = true;
        // Don't mess with room if it's already filled.
        } else if (map[currentRow][currentColumn] === 1) {
          map[currentRow][currentColumn] = createLocation({
            id: `${currentRow},${currentColumn}`,
            enemies: [
              new Character({
                id: `enemy1-${currentRow},${currentColumn}`
              }),
              new Character({
                id: `enemy2-${currentRow},${currentColumn}`
              })
            ] // TODO: Write function to fill room with enemies.
          });
        }
        // add the value from randomDirection to row and col (-1, 0, or 1) to update our location
        currentRow += randomDirection[0];
        currentColumn += randomDirection[1];
        tunnelLength++; // the tunnel is now one longer, so lets increment that variable
      }
    }
    // update our variables unless our last loop broke before we made any part of a tunnel
    if (tunnelLength) {
      lastDirection = randomDirection; // set lastDirection, so we can remember what way we went
      // we created a whole tunnel so lets decrement how many we have left to create
      maxTunnels--; // eslint-disable-line
    }
  }
  const lRoom = map[last_room[0]][last_room[1]];
  if (lRoom) {
    map[last_room[0]][last_room[1]] = lRoom.set('exit', true);
  }
  return {
    map,
    current_location
  };
}


/**
   * @param {Object} seed Contains the seed data for the world.
   * Floors: The total number of maps to build.
   * Events: Special events that occur at random. Get removed as they are populated.
   * @returns {World} New world object.
*/
function buildWorld(seed) {
  // If we are not passed a seed. Create one.
  if (seed === undefined) {
    seed = { // eslint-disable-line
      floors: 10,
      events: [],
    };
  }
  const areas = [];
  for (let i = 0; i < seed.floors; i++) {
    const { map, current_location } = createMap(20, 50, 8, seed.events);
    areas.push(new Area({
      id: i,
      floor: i,
      map,
      current_location
    }));
  }
  return new World({
    areas,
    current_floor: 0
  });
}

const getInitialState = () => {
  const world = buildWorld();
  const currArea = getCurrentArea(world);
  const character = new Character({
    name: 'Minion',
    class: 'Slime',
    max_health: 150,
    health: 150,
    items: [
      new Item(),
      new Item({
        id: 'health',
        name: 'Small Potion',
        description: 'A small potion that restores a little bit of health.',
        food: 0,
        degrade_rate: 0, // Only used for food.
        water: 0,
        health: 30,
        item_type: new ItemType({
          food: false,
          water: false
        }),
      })
    ],
    dimensional_items: []
  });
  const actions = setActions(currArea, character);
  const description = buildRoomDescription(currArea);
  return Immutable.OrderedMap({
    world,
    actions,
    action_breadcrumbs: [],
    world_description: description,
    character
  });
};

const initialState = getInitialState();

function WorldReducer(state = initialState, action) {
  switch (action.type) {
    case AppActionTypes.CHANGE_FLOOR: {
      const chf1 = state.setIn(['world', 'current_floor'], action.newFloor);
      // Reset actions
      const chf2 = chf1.set('actions', setActions(getCurrentArea(chf1.get('world')), chf1.get('character')));
      // Reset breadcrumbs
      const chf3 = chf2.set('action_breadcrumbs', []);
      return chf3;
    }
    case AppActionTypes.CHANGE_LOCATION:
      return changeLocation(state, action);

    case AppActionTypes.SET_ACTIONS:
      return state.set('actions', setActions(action.currArea), state.get('character'));

    case AppActionTypes.OPEN_SUB_MENU: {
      const newActions = state.set('actions', action.clickedAction.subActions);
      const newBread = state.update('action_breadcrumbs', (breadcrumbs) => {
        let aLabel = 'Actions';
        if (breadcrumbs.length > 0) {
          aLabel = breadcrumbs[breadcrumbs.length - 1].originalLabel;
        }
        breadcrumbs.push({
          bIndex: breadcrumbs.length,
          originalLabel: action.clickedAction.label,
          label: aLabel,
          preState: action.actions
        });
        return breadcrumbs;
      });
      return newBread.mergeDeep(newActions);
    }
    case AppActionTypes.BREADCRUMB_CLICKED: {
      const nActions = state.set('actions', action.actions);
      const nBread = nActions.update('action_breadcrumbs', breadcrumbs => breadcrumbs.slice(0, action.bIndex));
      return nBread;
    }
    case AppActionTypes.SET_DESCRIPTION:
      return state.set('world_description', action.description);

    case AppActionTypes.CREATE_CHARACTER:
      return state.set('character', new Character(action.seed));

    // TODO: Update UI to not allow taking items based on character inventory.
    case AppActionTypes.ADD_ITEMS:
      if (Array.isArray(action.itemsToAdd) === true) {
        const character = state.get('character');
        return state.updateIn(['character', 'items'], (items) => {
          if (items.length + action.itemsToAdd.length <= character.inventory_space) {
            // TODO: Remove items from location.
            items.push(...action.itemsToAdd);
          }
          return items;
        });
      }
      return state;

    case AppActionTypes.REMOVE_ITEMS:
      return state;
    case AppActionTypes.LEVEL_UP: {
      const character = state.get('character');
      return state.set('character', levelUp(character));
    }
    case AppActionTypes.BASIC_ATTACK: {
      // Perform Attack
      const { world, world_description } = basicAttack(state, action);
      // Reset Actions
      const actions = setActions(getCurrentArea(world), state.get('character'));
      const action_breadcrumbs = [];
      // Update world description with results.
      // TODO: Add in enemy attack.
      return state
        .set('actions', actions)
        .set('action_breadcrumbs', action_breadcrumbs)
        .set('world', world)
        .set('world_description', [world_description]);
    }
    default:
      return state;
  }
}

export default WorldReducer;
