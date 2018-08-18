import Immutable from 'immutable';
import Character from './Character';
import Item from './Item';

const Location = Immutable.Record({
  description: 'A bland and bleak wasteland. Let\'s get out of here...',
  safeZone: false,
  enemies: [new Character()],
  items: [new Item()],
  movementCost: {
    food: 10,
    water: 10,
  },
  areaType: 0, // Used to calculate the type of items appearing. Desert would produce very little water items.
  id: ''
});

export default Location;