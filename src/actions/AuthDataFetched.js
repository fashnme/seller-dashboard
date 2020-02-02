import { JWT_ARRIVED } from '../action-types';

const jwtArrived = (jwt) => ({
    type: JWT_ARRIVED,
    payload: jwt
});

export const authDataFetched = (jwt) => (dispatch) => {
    dispatch(jwtArrived(jwt));
}
