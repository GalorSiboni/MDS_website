import loggedReducer from "./isLogged";
import allRestaurantsReducer from "./allRestaurants";
import allDeliveryMenReducer from "./allDeliveryMen";
import adminReducer from "./isAdmin";
import { combineReducers } from "redux";
import allDeliveriesReducer from "./allDeliveries";
import allCitiesReducer from "./allCities";
import allPhoneReceptionistsReducer from "./allPhoneReceptionists";
import allUnapprovedRoutesReducer from "./allUnapprovedRoutes";

const allReducers = combineReducers({
    isLogged: loggedReducer,
    allDeliveryMen: allDeliveryMenReducer,
    allRestaurants: allRestaurantsReducer,
    allDeliveries: allDeliveriesReducer,
    isAdmin: adminReducer,
    allCities: allCitiesReducer,
    allUnapprovedRoutes: allUnapprovedRoutesReducer,
    allPhoneReceptionists: allPhoneReceptionistsReducer
});
export default allReducers;