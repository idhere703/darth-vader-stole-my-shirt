import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

const Actions = {
  openChar(open) {
    AppDispatcher.dispatch({
      type: AppActionTypes.OPEN_CHAR_SIDEBAR,
      open,
    });
  },
  openItems(open) {
    AppDispatcher.dispatch({
      type: AppActionTypes.OPEN_ITEM_SIDEBAR,
      open
    });
  },
  createWorld(seed) {
    AppDispatcher.dispatch({
      type: AppActionTypes.CREATE_WORLD,
      seed
    });
  }
};

export default Actions;