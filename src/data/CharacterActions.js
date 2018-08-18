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
};

export default Actions;