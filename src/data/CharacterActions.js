import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

const Actions = {
  createCharacter(seed, customProps) {
    AppDispatcher.dispatch({
      type: AppActionTypes.CREATE_CHARACTER,
      // Overwrite seed with custom props.
      seed: Object.assign({}, seed, customProps),
    });
  },
  applyMovementCost(food, water) {
    AppDispatcher.dispatch({
      type: AppActionTypes.REDUCE_FOOD,
      food,
    });
    AppDispatcher.dispatch({
      type: AppActionTypes.REDUCE_WATER,
      water,
    });
  },
  addItems(items) {
    AppDispatcher.dispatch({
      type: AppActionTypes.ADD_ITEMS,
      itemsToAdd: items
    });
  },
  removeItems(items) {
    AppDispatcher.dispatch({
      type: AppActionTypes.REMOVE_ITEMS,
      itemsToRemove: items
    });
  }
};

export default Actions;