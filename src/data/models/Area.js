import Immutable from 'immutable';
import Location from './Location';

const Area = Immutable.Record({
  map: [new Location()],
  current_location: [0,0],
  // Grassland might have less water cost associated with movement than say a desert.
  movement_cost: {
    food: 10,
    water: 10,
  },
  areaType: 0, // Used to calculate the type of items appearing. Desert would produce very little water items.
  floor: 0 // The id used to determine where the heck we are.
});

export default Area;