import Immutable from 'immutable';


const ItemType = Immutable.Record({
  consumable: true,
  weapon: false,
  armor: false,
  food: true,
  water: true
});

const Item = Immutable.Record({
  id: 'manna',
  name: 'Manna',
  description: 'Manna from the heavens. Restores food and water.',
  food: 10,
  degrade_rate: 1, // Only used for food.
  water: 10,
  health: 0,
  // A consumable object with stat increases.
  // Such as: { speed: 10, perception: 1 }
  stat_increase: {},
  item_type: new ItemType({}),
  // Stat modifiers, only available for weapons and armor.
  // Object with status to modify, such as: { speed: 0.10, attack: 0.05 }
  stat_modifiers: {},
  uses: 1, // Number of items an item can be used.
  space: 1 // Amount of space an item takes up in inventory.
});

export { Item, ItemType };