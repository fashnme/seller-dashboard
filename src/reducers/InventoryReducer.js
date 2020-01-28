import * as ActionTypes from '../action-types';

export default (state = {
    isLoading: true,
    errMess: null,
    inventoryData: []
}, action) => {
    switch (action.type) {
        case ActionTypes.INVENTORY_FETCHED:
            return { ...state, isLoading: false, errMess: null, inventoryData: action.payload };

        case ActionTypes.INVENTORY_LOADING:
            return { ...state, isLoading: true, errMess: null, inventoryData: [] }

        case ActionTypes.INVENTORY_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};