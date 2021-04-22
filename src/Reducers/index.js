import loggedReducer from "./isLogged";
import allRestaurantsReducer from "./allRestaurants";
import allDeliveryMenReducer from "./allDeliveryMen";
import adminReducer from "./isAdmin";
import { combineReducers } from "redux";
import allDeliveriesReducer from "./allDeliveries";

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allDeliveryMen: allDeliveryMenReducer,
    allRestaurants: allRestaurantsReducer,
    allDeliveries: allDeliveriesReducer,
    isAdmin: adminReducer
});
export default allReducers;