import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

const Actions = {
    openSidebar(open) {
        AppDispatcher.dispatch({
            type: AppActionTypes.OPEN_SIDEBAR,
            open,
        });
    },
};

export default Actions;