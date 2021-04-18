import loggedReducer from "./isLogged";
import allRestaurantsReducer from "./allRestaurants";
import allDeliveryMenReducer from "./allDeliveryMen";
import adminReducer from "./isAdmin";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allDeliveryMen: allDeliveryMenReducer,
    allRestaurants: allRestaurantsReducer,
    isAdmin: adminReducer
});
export default allReducers;