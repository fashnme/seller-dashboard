import * as ActionTypes from '../action-types';

export default (state = {
    isLoading: true,
    errMess: null,
    profileData: [],
    jwt: null,
}, action) => {
    switch (action.type) {

        case ActionTypes.JWT_ARRIVED:
            state.jwt = action.payload;

        case ActionTypes.PROFILE_FETCHED:
            return { ...state, isLoading: false, errMess: null, profileData: action.payload };

        case ActionTypes.PROFILE_LOADING:
            return { ...state, isLoading: true, errMess: null, profileData: [] }

        case ActionTypes.PROFILE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};