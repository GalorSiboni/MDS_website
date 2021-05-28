import loggedReducer from "./isLogged";
import allRestaurantsReducer from "./allRestaurants";
import allDeliveryMenReducer from "./allDeliveryMen";
import adminReducer from "./isAdmin";
import { combineReducers } from "redux";
import allDeliveriesReducer from "./allDeliveries";
import allCitiesReducer from "./allCities";
import allPhoneReceptionistsReducer from "./allPhoneReceptionists";
import allUnapprovedRoutesReducer from "./allUnapprovedRoutes";
import allAddressesReducer from "./allAddresses";
import currentPhoneReceptionistIDReducer from "./currentPhoneReceptionistID";

const allReducers = combineReducers({
    isLogged: loggedReducer,
    currentPhoneReceptionistID: currentPhoneReceptionistIDReducer,
    allDeliveryMen: allDeliveryMenReducer,
    allRestaurants: allRestaurantsReducer,
    allDeliveries: allDeliveriesReducer,
    isAdmin: adminReducer,
    allCities: allCitiesReducer,
    allUnapprovedRoutes: allUnapprovedRoutesReducer,
    allPhoneReceptionists: allPhoneReceptionistsReducer,
    allAddresses: allAddressesReducer
});
export default allReducers;