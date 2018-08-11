import Immutable from 'immutable';

const location = Immutable.Record({
    enemies: [],
    events: [],
    items: [],
    name: '',
    id: ''
});

const Area = Immutable.Record({
    location,
    notification: '',
    id: ''
});

const World = Immutable.Record({
  id: '',
  onFire: false,
  areas: [Area]
});

export default World;