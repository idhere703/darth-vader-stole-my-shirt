import Immutable from 'immutable';
import Character from './Character';
import { Item } from './Item';

const Location = Immutable.Record({
  description: 'A bland and bleak wasteland...',
  safe_zone: false,
  enemies: [new Character()],
  items: [new Item()],
  id: ''
});

export default Location;