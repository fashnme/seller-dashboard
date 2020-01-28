import sharedVariables from '../variables/shared';
import { INVENTORY_LOADING, INVENTORY_FAILED, INVENTORY_FETCHED } from '../action-types';
import axios from 'axios';

export const inventoryLoading = () => ({
    type: INVENTORY_LOADING,
});

export const inventoryFailed = (errmess) => ({
    type: INVENTORY_FAILED,
    payload: errmess
});

export const inventoryFetched = (inventory) => ({
    type: INVENTORY_FETCHED,
    payload: inventory
});

export const inventoryPageDataFetch = () => (dispatch) => {

    dispatch(inventoryLoading());

    const { headers, baseUrl } = sharedVariables;
    axios.get(`${baseUrl}/seller/get-inventory/`, { headers })
        .then(inventory => {
            console.log("inventory fetched: ", inventory.data.inventory)
            dispatch(inventoryFetched(inventory.data.inventory))
        })
        .catch(error => dispatch(inventoryFailed(error.message)));
}

