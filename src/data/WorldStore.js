import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';
import World from './models/World';
import Area from './models/Area';
import Location from './models/Location';
import Event from './models/Event';
import Character from './models/Character';


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
        map[currentRow][currentColumn] = createLocation(); //set the value of the index in map to 0 (a tunnel, making it one longer)
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
  return map;
};

/**
   * @param {Number} floors The total number of maps to build.
   * @param {Character} character Character being populated into the world.
   * @returns {World} New world object.
*/
function buildWorld(seed = { floors: 10, character: new Character({ class: 'Slime', max_health: 150, health: 150 }) }) {
  const areas = [];
  for (let i = 0; i < seed.floors; i++) {
    areas.push(new Area({
      id: i,
      map: createMap(20, 50, 8, [])
    }));
  }

  return new World({
    areas
  });
}


class WorldStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.CREATE_WORLD:
        if (action.seed !== undefined) return state.set('world', buildWorld(action.seed));
        return state.set('world', buildWorld());
      default:
        return state;
    }
  }
}

export default new WorldStore();