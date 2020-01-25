import * as ActionTypes from '../action-types';

export default (state = {
  isLoading: true,
  errMess: null,
  ordersData: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ORDERS_FETCHED:
      return { ...state, isLoading: false, errMess: null, ordersData: action.payload };

    case ActionTypes.ORDERS_LOADING:
      return { ...state, isLoading: true, errMess: null, ordersData: [] }

    case ActionTypes.ORDERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};