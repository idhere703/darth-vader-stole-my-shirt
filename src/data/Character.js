import Immutable from 'immutable';

const Character = Immutable.Record({
    name: '',
    class: '',
    level: 1,
    experience_points: 0,
    needed_exp: 150,
    attack: 10,
    defense: 1,
    max_health: 100,
    health: 100,
    wisdom: 9,
    stamina: 0,
    stealth: 0.03,
    perception: 1,
    speed: 10,
    max_food: 100,
    food: 100,
    max_water: 100,
    water: 100,
    inventory_space: 30,
    dimensional_inventory: 5,
    max_party_size: 0, // This probably won't make it in.
    equipment: [],
    statuses: [],
    skills: [],
});


export default Character;