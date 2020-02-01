import {
    JWT_ARRIVED
} from '../action-types';


export default (state = {}, action) => {

    switch (action.type) {
        case JWT_ARRIVED:
            state = action.payload;
        default:
            return state;
    }
};
