import { combineReducers } from 'redux';

import DashboardReducer from './DashboardReducer';
import OrdersReducer from './OrdersReducer';
import ProfileReducer from './ProfileReducer';
import InventoryReducer from './InventoryReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    DashboardReducer,
    OrdersReducer,
    ProfileReducer,
    InventoryReducer,
    AuthReducer
});
