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
  }
};

export default Actions;