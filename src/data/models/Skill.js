import Immutable from 'immutable';

const Skill = Immutable.Record({
  name: 'Charge',
  description: 'A reckless charge that does increased physical damage.',
  level: 1,
  attack: 0.1,
  cost: {
    stamina: 10,
    mana: 0,
    energy: 0,
  }
});

export default Skill;