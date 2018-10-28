import AppActionTypes from './AppActionTypes';

export function createWorld(seed) {
  return ({
    type: AppActionTypes.CREATE_WORLD,
    seed,
  });
}
export function changeLocation(newLocation) {
  return ({
    type: AppActionTypes.CHANGE_LOCATION,
    newLocation
  });
}
export function changeFloor(newFloor) {
  return ({
    type: AppActionTypes.CHANGE_FLOOR,
    newFloor
  });
}
export function setActions(currArea) {
  return ({
    type: AppActionTypes.SET_ACTIONS,
    currArea
  });
}
export function openSubmenu(actions, clickedAction) {
  return ({
    type: AppActionTypes.OPEN_SUB_MENU,
    actions,
    clickedAction
  });
}
export function breadcrumbClicked(actions, index) {
  return ({
    type: AppActionTypes.BREADCRUMB_CLICKED,
    actions,
    bIndex: index
  });
}
export function setDescription(description) {
  return ({
    type: AppActionTypes.SET_DESCRIPTION,
    description
  });
}
// CHARACTER
export function createCharacter(seed, customProps) {
  return ({
    type: AppActionTypes.CREATE_CHARACTER,
    // Overwrite seed with custom props.
    seed: Object.assign({}, seed, customProps)
  });
}
export function reduceFood(food) {
  return ({
    type: AppActionTypes.REDUCE_FOOD,
    food,
  });
}
export function reduceWater(water) {
  return ({
    type: AppActionTypes.REDUCE_WATER,
    water,
  });
}
export function addItems(items) {
  return ({
    type: AppActionTypes.ADD_ITEMS,
    itemsToAdd: items
  });
}
export function removeItems(items) {
  return ({
    type: AppActionTypes.REMOVE_ITEMS,
    itemsToRemove: items
  });
}
