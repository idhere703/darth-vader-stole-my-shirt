import Immutable from 'immutable';

const Potential = Immutable.Record({
  id: 'shapeless', // Used to match with character records.
  // Description isn't strictly necessary. It might get cut.
  description: 'A shapeless being\'s potential. The curse of the formless prevents greater growth.',
  attack: 0.01,
  defense: 0.05,
  health: 0.001,
  wisdom: 0.09,
  stamina: 0,
  mana: 0,
  energy: 0,
  stealth: 0.003,
  perception: 0.01,
  speed: 0.1,
});


export default Potential;