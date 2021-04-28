import loggedReducer from "./isLogged";
import allRestaurantsReducer from "./allRestaurants";
import allDeliveryMenReducer from "./allDeliveryMen";
import adminReducer from "./isAdmin";
import { combineReducers } from "redux";
import allDeliveriesReducer from "./allDeliveries";
import allCitiesReducer from "./allCities";

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allDeliveryMen: allDeliveryMenReducer,
    allRestaurants: allRestaurantsReducer,
    allDeliveries: allDeliveriesReducer,
    isAdmin: adminReducer,
    allCities: allCitiesReducer
});
export default allReducers;