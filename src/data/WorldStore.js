import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';
import World from './models/World';
import Area from './models/Area';
import Location from './models/Location';
import Character from './models/Character';
import { Item } from './models/Item';
import { getCurrentArea, getCurrentLocation } from '../utils';

function getPickupOptions(currLocation) {
  const options = [];
  if (currLocation) {
    const items = currLocation.get('items');
    items.forEach(item => {
      options.push({
        label: `${item.name}`,
        action: () => {}
      });
    });
  }
  return options;
}

function getAttackOptions(currLocation) {
  const options = [];
  if (currLocation) {
    const enemies = currLocation.get('enemies');
    enemies.forEach(enemy => {
      options.push({
        label: `${enemy.name} (lv ${enemy.level} ${enemy.class})`,
        action: () => {}
      });
    });
  }
  return options;
}

function getMovementOptions(map, currentLocation) {
  const possibleOptions = [
    {
      label: 'North',
      direction: [currentLocation[0] + 1, currentLocation[1]],
      action: () => {
        AppDispatcher.dispatch({
          type: AppActionTypes.CHANGE_LOCATION,
          newLocation: [currentLocation[0] + 1, currentLocation[1]],
        });
      },
    }, {
      label: 'East',
      direction: [currentLocation[0], currentLocation[1] + 1],
      action: () => {
        AppDispatcher.dispatch({
          type: AppActionTypes.CHANGE_LOCATION,
          newLocation: [currentLocation[0], currentLocation[1] + 1],
        });
      },
    }, {
      label: 'West',
      direction: [currentLocation[0], currentLocation[1] - 1],
      action: () => {
        AppDispatcher.dispatch({
          type: AppActionTypes.CHANGE_LOCATION,
          newLocation: [currentLocation[0], currentLocation[1] - 1],
        });
      },
    }, {
      label: 'South',
      direction: [currentLocation[0] - 1, currentLocation[1]],
      action: () => {
        AppDispatcher.dispatch({
          type: AppActionTypes.CHANGE_LOCATION,
          newLocation: [currentLocation[0] - 1, currentLocation[1]],
        });
      },
    }
  ];
  return possibleOptions.filter(option => {
    const o = option.direction;
    return map[o[0]] !== undefined && map[o[0]][o[1]] !== 1;
  });
}

function setActions(currArea) {
  return [{
    label: 'Move',
    subActions: getMovementOptions(currArea.get('map'), currArea.get('current_location'))
  }, {
    label: 'Examine',
    subActions: [
      {
        label: 'Room',
        action: () => {}
      },
      {
        label: 'Enemies',
        visible(locat) {
          return locat.get('enemies').length;
        },
        subActions: []
      },
      {
        label: 'Items',
        visible(locat) {
          return locat.get('items').length;
        },
        subActions: []
      },
    ],
  }, {
    label: 'Attack',
    subActions: getAttackOptions(getCurrentLocation(currArea)),
    visible(locat) {
      return locat.get('enemies').length;
    }
  }, {
    label: 'Special',
    visible(locat) {
      return locat.get('enemies').length;
    }
  }, {
    label: 'Use'
  }, {
    label: 'Pickup',
    subActions: getPickupOptions(getCurrentLocation(currArea)),
    visible(locat) {
      return locat.get('items').length;
    }
  }, {
    label: 'Use Dimensional'
  }];
}


// Reduce passed prop to no less than zero.
function reduceProp(character, prop, newVal) {
  if (character && prop && typeof newVal === 'number') {
    const newProp = character.get(prop) - newVal;
    if (newProp < 0) character = character.set(prop, 0);
    else character = character.set(prop, newProp);
  }
  return character
}


function isValidLocation(location) {
  return location !== undefined && location !== 1;
}

function getLocation(area, location) {
  const locationIndex = location || area.get('current_location');
  const map = area.get('map');
  return map[locationIndex[0]] && map[locationIndex[0]][locationIndex[1]];
}

function createLocation(location = {}, event) {
  if (typeof event === 'object' && event !== null) return new Location(Object.assign({}, location, event));
  // TODO: Build random location information.
  return new Location(location);
}

// Helper function to make a two dimentional array that takes a number and the dimentions of the array.
function createArray(num, dimensions) {
  let array = [];
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
function createMap(dimensions = 20, maxTunnels = 50, maxLength = 8, events) {
  let map = createArray(1, dimensions), // create a 2d array full of 1's
    currentRow = Math.floor(Math.random() * dimensions), // our current row - start at a random spot
    currentColumn = Math.floor(Math.random() * dimensions), // our current column - start at a random spot
    current_location = [0,0],
    charSet = false,
    directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // array to get a random direction from (left,right,up,down)
    lastDirection = [], // save the last direction we went
    randomDirection; // next turn/direction - holds a value from directions
  

  // lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
  while (maxTunnels && dimensions && maxLength) {
  
    // lets get a random direction - until it is a perpendicular to our lastDirection
    // if the last direction = left or right,
    // then our new direction has to be up or down,
    // and vice versa
    do {
      randomDirection = directions[Math.floor(Math.random() * directions.length)];
    } while (
      (randomDirection[0] === -lastDirection[0] && 
        randomDirection[1] === -lastDirection[1]) || 
        (randomDirection[0] === lastDirection[0] && 
          randomDirection[1] === lastDirection[1]
        )
    );
  
    let randomLength = Math.ceil(Math.random() * maxLength), //length the next tunnel will be (max of maxLength)
      tunnelLength = 0; //current length of tunnel being created
  
      // lets loop until our tunnel is long enough or until we hit an edge
    while (tunnelLength < randomLength) {
  
      //break the loop if it is going out of the map
      if (((currentRow === 0) && (randomDirection[0] === -1)) ||
              ((currentColumn === 0) && (randomDirection[1] === -1)) ||
              ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
              ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
        break;
      } else {
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
        } else {
          map[currentRow][currentColumn] = createLocation({
            id: `${currentRow},${currentColumn}`
          });
        }
        currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
        currentColumn += randomDirection[1];
        tunnelLength++; //the tunnel is now one longer, so lets increment that variable
      }
    }
  
    if (tunnelLength) { // update our variables unless our last loop broke before we made any part of a tunnel
      lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
      maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
    }
  }
  return { map, current_location };
};

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
  return new World({ areas, current_floor: 0 });
}


class WorldStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    const world = buildWorld();
    const currArea = getCurrentArea(world);
    const actions = setActions(currArea)
    return Immutable.OrderedMap({ 
      world: world,
      actions,
      action_breadcrumbs: [],
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
      case AppActionTypes.CREATE_WORLD:
        const world = buildWorld(action.seed);
        AppDispatcher.dispatch({ type: AppActionTypes.SET_ACTIONS, currArea: getCurrentArea(world) });
        // TODO: Set actions here as well.
        return state.set('world', world);
      case AppActionTypes.CHANGE_FLOOR:
        const chf1 = state.setIn(['world', 'current_floor'], action.newFloor);
        // Reset actions
        const chf2 = chf1.set('actions', setActions(getCurrentArea(chf1.get('world'))));
        // Reset breadcrumbs
        const chf3 = chf2.set('action_breadcrumbs', []);
        return chf3;
      case AppActionTypes.CHANGE_LOCATION:
        const s1 = state.updateIn(['world', 'areas'], areas => {
          const index = areas.findIndex(a => a.floor === state.get('world').current_floor);
          // Only allow update if the space isn't blocked.
          const currLoc = getLocation(areas[index], action.newLocation);
          if (isValidLocation(currLoc)) {
            areas[index] = areas[index].set('current_location', action.newLocation);
          }
          return areas;
        });
        // Reset actions
        const s2 = s1.set('actions', setActions(getCurrentArea(s1.get('world'))));
        // Reset breadcrumbs
        const s3 = s2.set('action_breadcrumbs', []);
        return s3;
      case AppActionTypes.SET_ACTIONS:
        return state.set('actions', setActions(action.currArea));
      case AppActionTypes.OPEN_SUB_MENU:
        const newActions = state.set('actions', action.clickedAction.subActions);
        const newBread = state.update('action_breadcrumbs', breadcrumbs => {
          breadcrumbs.push({ bIndex: breadcrumbs.length, label: action.clickedAction.label, preState: action.actions})
          return breadcrumbs;
        });
        return newBread.mergeDeep(newActions);
      case AppActionTypes.BREADCRUMB_CLICKED:
        const nActions = state.set('actions', action.actions);
        const nBread = nActions.update('action_breadcrumbs', breadcrumbs => breadcrumbs.slice(0, action.bIndex));
        return nBread;
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
      case AppActionTypes.REMOVE_ITEMS:
        return state;
      default:
        return state;
    }
  }
}

export default new WorldStore();