import Immutable from 'immutable';
import Area from './Area';

const World = Immutable.Record({
  id: 'overlordis#1',
  onFire: false, // For now...
  areas: [new Area()]
});

export default World;