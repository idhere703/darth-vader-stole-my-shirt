import Immutable from 'immutable';

// An event would overwrite location information. Use this for special events.
const Event = Immutable.Record({
  description: '',
  safe_zone: false,
  enemies: [],
  items: [],
});

export default Event;