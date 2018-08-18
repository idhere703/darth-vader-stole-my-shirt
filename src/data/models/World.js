import Immutable from 'immutable';
import Character from './Character';
import Item from './Item';

const location = Immutable.Record({
  description: 'A bland and bleak wasteland. Let\'s get out of here...',
  safeZone: false,
  enemies: [Character],
  events: [],
  items: [Item],
  id: ''
});

const Area = Immutable.Record({
  locations: [location],
  // Grassland might have less water cost associated with movment than say a desert.
  movementCost: {
    food: 10,
    water: 10,
  },
  areaType: 0, // Used to calculate the type of items appearing. Desert would produce very little water items.
  id: ''
});

const World = Immutable.Record({
  id: 'overlordis#1',
  onFire: false, // For now...
  areas: [Area]
});

export default World;