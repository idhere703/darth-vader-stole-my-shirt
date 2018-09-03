import Immutable from 'immutable';
import Skill from './Skill';

const Character = Immutable.Record({
  name: 'Formless',
  class: 'Shapeless',
  description: 'A shapeless being given no form; cursed by this land.',
  level: 1,
  experience_points: 0,
  needed_exp: 150,
  attack: 10,
  defense: 1,
  max_health: 100,
  health: 100,
  wisdom: 9,
  stamina: 0,
  mana: 0,
  energy: 0,
  stealth: 0.03,
  perception: 1,
  speed: 10,
  max_food: 100,
  food: 100,
  max_water: 100,
  water: 100,
  inventory_space: 30,
  dimensional_inventory_space: 5,
  max_party_size: 0, // This probably won't make it in.
  items: [], // An array of items.
  dimensional_items: [], // An array of items.
  statuses: [], // Any special statuses.
  skills: [new Skill()], // Skills, require something to be used.
  drops: [], // On death, nothing dropped from unnamed foes and the character.
  possible_drops: [], // What's the possible drops.
  experience_given: 0, // Given on death.
  current_floor: 0,
});


export default Character;