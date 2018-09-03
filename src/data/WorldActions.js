import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

const Actions = {
  createWorld(seed) {
    AppDispatcher.dispatch({
      type: AppActionTypes.CREATE_WORLD,
      seed,
    });
  },
  changeLocation(newLocation) {
    AppDispatcher.dispatch({
      type: AppActionTypes.CHANGE_LOCATION,
      newLocation
    });
  },
  changeFloor(newFloor) {
    AppDispatcher.dispatch({
      type: AppActionTypes.CHANGE_FLOOR,
      newFloor
    });
  },
  setActions(currArea) {
    AppDispatcher.dispatch({
      type: AppActionTypes.SET_ACTIONS,
      currArea
    });
  },
  openSubmenu(actions, clickedAction) {
    AppDispatcher.dispatch({
      type: AppActionTypes.OPEN_SUB_MENU,
      actions,
      clickedAction
    });
  },
  breadcrumbClicked(actions, index) {
    AppDispatcher.dispatch({
      type: AppActionTypes.BREADCRUMB_CLICKED,
      actions,
      bIndex: index
    });
  },
  setDescription(description) {
    AppDispatcher.dispatch({
      type: AppActionTypes.SET_DESCRIPTION,
      description
    });
  },
  // CHARACTER
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