import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

const Actions = {
    createWorld(seed) {
        AppDispatcher.dispatch({
            type: AppActionTypes.CREATE_WORLD,
            seed,
        });
    },
};

export default Actions;