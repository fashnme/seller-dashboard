import { combineReducers } from 'redux';

import DashboardReducer from './DashboardReducer';
import OrdersReducer from './OrdersReducer';

export default combineReducers({
    dashboardReducer: DashboardReducer,
    ordersReducer: OrdersReducer
});
