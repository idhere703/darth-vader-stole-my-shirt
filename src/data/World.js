import Immutable from 'immutable';

const location = Immutable.Record({
    description: '',
    safeZone: false,
    enemies: [],
    events: [],
    items: [],
    name: '',
    id: ''
});

const Area = Immutable.Record({
    locations: [location],
    movementCost: {
        food: 10,
        water: 10,
    },
    areaType: 0, // Grassland might have less food/water cost associated with movment than say a desert.
    id: ''
});

const World = Immutable.Record({
  id: 'overlordis#1',
  onFire: false, // For now...
  areas: [Area]
});

export default World;