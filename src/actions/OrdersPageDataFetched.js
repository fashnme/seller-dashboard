import sharedVariables from '../variables/shared';
import { ORDERS_LOADING, ORDERS_FAILED, ORDERS_FETCHED } from '../action-types';
import axios from 'axios';

export const ordersLoading = () => ({
    type: ORDERS_LOADING,
});

export const ordersFailed = (errmess) => ({
    type: ORDERS_FAILED,
    payload: errmess
});

export const ordersFetched = (orders) => ({
    type: ORDERS_FETCHED,
    payload: orders
});

export const ordersPageDataFetch = () => (dispatch) => {

    dispatch(ordersLoading());

    const { headers, baseUrl } = sharedVariables;
    axios.get(`${baseUrl}/seller/get-active-orders/`, { headers })
        .then(orders =>  {
            // console.log("axios fetched: ", orders.data)
            dispatch(ordersFetched(orders.data.activeOrders))
        })
        .catch(error => dispatch(ordersFailed(error.message)));
}

