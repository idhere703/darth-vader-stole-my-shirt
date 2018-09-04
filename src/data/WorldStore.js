import React from 'react';
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';
import World from './models/World';
import Area from './models/Area';
import Location from './models/Location';
import Character from './models/Character';
import { Item, ItemType } from './models/Item';
import { getCurrentArea, getCurrentLocation } from '../utils';

function changeLocation(state, action) {
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
  const s2 = s1.set('actions', setActions(getCurrentArea(s1.get('world')), s1.get('character')));
  // Reset breadcrumbs
  const s3 = s2.set('action_breadcrumbs', []);
  // Build room description.
  return s3.set('world_description', buildRoomDescription(getCurrentArea(s3.get('world'))));
}

function buildRoomDescription(currArea) {
  const locat = getCurrentLocation(currArea);
  const enemies = locat.get('enemies');
  const items = locat.get('items');
  const eLen = enemies.length;
  const iLen = items.length;

  let eDes = '';
  let iDes = '';

  if (eLen === 1) eDes = `One enemy.`;
  else if (eLen > 1) eDes = `Several enemies.`

  if (iLen === 1) iDes = `One item.`;
  else if (iLen > 1) iDes =`Several items.`;

  const description = [
    (<p key="desr0">{`You look around and see:`}</p>),
    (<p key="desr1">{`${locat.get('description')}`}</p>),
    (<p key="desr2">{eDes}</p>),
    (<p key="desr3">{iDes}</p>)
  ];
  return description;
}

function getPickupOptions(currLocation) {
  const options = [];
  if (currLocation) {
    const items = currLocation.get('items');
    options.push({
      label: 'Take All',
      action: () => {}
    });
    items.forEach(item => {
      options.push({
        label: `${item.name}`,
        tooltip: getItemDescription(item),
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
        tooltip: getEnemyDescription(enemy),
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

function getEnemyDescription(e) {
  return [
    (<p key="0">Name: {e.name}</p>),
    (<p key="00">Health: {e.health}</p>),
    (<p key="1">Class: {e.class}</p>),
    (<p key="2">Description: {e.description}</p>),
    (<p key="3">Level: {e.level}</p>),
  ];
}

function getItemDescription(i) {
  // TODO: Add in multiple type support. Such as weapon modification and such.
  return [
    (<p key="0">{i.description}</p>),
    (<p key="1">Food: {i.food}</p>),
    (<p key="2">Water: {i.water}</p>),
    (<p key="3">Health: {i.health}</p>),
    (<p key="4">Uses: {i.uses}</p>),
    (<p key="5">Size: {i.space}</p>),
  ];
}

function getSkillDescription(s) {
  return [
    (<p key="0">{s.name} (lv {s.level})</p>),
    (<p key="1">{s.description}</p>),
  ];
}

function setActions(currArea, character) {
  const currLocation = getCurrentLocation(currArea);
  return [{
    label: 'Move',
    subActions: getMovementOptions(currArea.get('map'), currArea.get('current_location'))
  }, {
    label: 'Examine',
    subActions: [
      {
        label: 'Room',
        action: () => {
          AppDispatcher.dispatch({
            type: AppActionTypes.SET_DESCRIPTION,
            description: buildRoomDescription(currArea)
          });
        }
      },
      {
        label: 'Enemies',
        visible(locat) {
          return locat.get('enemies').length;
        },
        // TODO: Implement perception check and pass list of perceived enemies to render.
        // Should only be calculated on room enter.
        subActions: currLocation.get('enemies').map(e => {
          return {
            label: e.name,
            action: () => {
              AppDispatcher.dispatch({
                type: AppActionTypes.SET_DESCRIPTION,
                description: getEnemyDescription(e)
              });
            }
          };
        })
      },
      {
        label: 'Items',
        visible(locat) {
          return locat.get('items').length;
        },
        subActions: currLocation.get('items').map(i => {
          return {
            label: i.name,
            action: () => {
              AppDispatcher.dispatch({
                type: AppActionTypes.SET_DESCRIPTION,
                description: getItemDescription(i)
              });
            }
          };
        })
      },
    ],
  }, {
    label: 'Attack',
    subActions: getAttackOptions(currLocation),
    visible(locat) {
      return locat.get('enemies').length;
    }
  }, {
    label: 'Special',
    subActions: character.get('skills').map(skill => {
      return {
        label: skill.name,
        tooltip: getSkillDescription(skill),
      };
    }),
    visible(locat) {
      return locat.get('enemies').length && character.get('skills').length > 0;
    }
  }, {
    label: 'Use',
    visible: () => character.get('items').length > 0,
    subActions: character.get('items').map(i => {
      return {
        label: i.name,
        tooltip: getItemDescription(i),
        action: () => {}
      };
    })
  }, {
    label: 'Pickup',
    subActions: getPickupOptions(currLocation),
    visible(locat) {
      return locat.get('items').length;
    }
  }, {
    label: 'Use Dimensional',
    visible: () => character.get('dimensional_items').length > 0,
    subActions: character.get('dimensional_items').map(i => {
      return {
        label: i.name,
        action: () => {}
      };
    })
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
      world: world,
      actions,
      action_breadcrumbs: [],
      world_description: description,
      character
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.CREATE_WORLD:
        const world = buildWorld(action.seed);
        AppDispatcher.dispatch({ type: AppActionTypes.SET_ACTIONS, currArea: getCurrentArea(world) });
        return state.set('world', world);


      case AppActionTypes.CHANGE_FLOOR:
        const chf1 = state.setIn(['world', 'current_floor'], action.newFloor);
        // Reset actions
        const chf2 = chf1.set('actions', setActions(getCurrentArea(chf1.get('world')), chf1.get('character')));
        // Reset breadcrumbs
        const chf3 = chf2.set('action_breadcrumbs', []);
        return chf3;


      case AppActionTypes.CHANGE_LOCATION:
        return changeLocation(state, action);


      case AppActionTypes.SET_ACTIONS:
        return state.set('actions', setActions(action.currArea), state.get('character'));


      case AppActionTypes.OPEN_SUB_MENU:
        const newActions = state.set('actions', action.clickedAction.subActions);
        const newBread = state.update('action_breadcrumbs', breadcrumbs => {
          let aLabel = 'Actions';
          if (breadcrumbs.length > 0) aLabel = breadcrumbs[breadcrumbs.length - 1].originalLabel;
          breadcrumbs.push({ 
            bIndex: breadcrumbs.length,
            originalLabel: action.clickedAction.label,
            label: aLabel, 
            preState: action.actions
          })
          return breadcrumbs;
        });
        return newBread.mergeDeep(newActions);


      case AppActionTypes.BREADCRUMB_CLICKED:
        const nActions = state.set('actions', action.actions);
        const nBread = nActions.update('action_breadcrumbs', breadcrumbs => breadcrumbs.slice(0, action.bIndex));
        return nBread;


      case AppActionTypes.SET_DESCRIPTION:
        return state.set('world_description', action.description);


      case AppActionTypes.CREATE_CHARACTER:
        return state.set('character', new Character(action.seed));


      case AppActionTypes.REDUCE_FOOD:
        return state.set('character', reduceProp(state.get('character'), 'food', action.food));


      case AppActionTypes.REDUCE_WATER:
        return state.set('character', reduceProp(state.get('character'), 'water', action.water));


      case AppActionTypes.ADD_ITEMS:
        if (Array.isArray(action.itemsToAdd) === true) {
          const character = state.get('character');
          return state.updateIn(['character', 'items'], items => {
            if (items.length + action.itemsToAdd.length <= character.inventory_space) {
              // TODO: Remove items from location.
              items.push(...action.itemsToAdd);
            } else {
              AppDispatcher.dispatch({
                type: AppActionTypes.SET_DESCRIPTION,
                description: (<p key="max_items">Inventory space exceeded.</p>)
              });
            }
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