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
  }
};

export default Actions;