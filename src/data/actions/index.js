import AppActionTypes from './AppActionTypes';
export function changeLocationAction(newLocation) {
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

export function basicAttackAction(actor, targetId) {
  return ({
    type: AppActionTypes.BASIC_ATTACK,
    targetId,
    actor
  });
}
