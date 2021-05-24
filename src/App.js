import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview  from './Pages/Overview';
import LoginPage from './Pages/LoginPage';
import Restaurants_Managements from './Pages/Restaurant/Restaurants_Management';
import addNewRestaurant from './Pages/Restaurant/addNewRestaurant';
import DeliveryMan_Management from './Pages/Deliveries/DeliveryMan_Management';
import RouteManagement from './Pages/Deliveries/RouteManagement';
import DeliveriesHistory from './Pages/Deliveries/DeliveriesHistory';
import { DailyReports, WeeklyReports, MonthlyReports } from './Pages/Reports';
import { AddNewPhoneReceptionist, PhoneReceptionistManagement } from './Pages/PhoneReceptionistManagement';
import {useDispatch, useSelector} from "react-redux";
import addNewDeliveryMan from "./Pages/Deliveries/addNewDeliveryMan";
import addNewDelivery from "./Pages/Deliveries/addNewDelivery";
import deliverymanService from "./Services/deliverymanService";
import {
    setAllAddresses,
    setAllCities,
    setAllDeliveries,
    setAllDeliverymen,
    setAllPhoneReceptionists,
    setAllRestaurants
} from "./Actions";
import phoneReceptionistService from "./Services/phoneReceptionistService";
import restaurantService from "./Services/restaurantService";
import addressService from "./Services/addressService";
import deliveryService from "./Services/deliveryService";

function App() {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.isAdmin);
    getData(dispatch);
    if (useSelector(state => state.isLogged)) {
        if (isAdmin) {
            return (
                <Router>
                    <Sidebar/>
                    <Switch>
                        <Route path='/' exact component={Overview}/>
                        <Route path='/deliveries/DeliveryMan_Management' exact component={DeliveryMan_Management}/>
                        <Route path='/deliveries/DeliveriesHistory' exact component={DeliveriesHistory}/>
                        <Route path='/deliveries/add_new_delivery_man' exact component={addNewDeliveryMan}/>
                        <Route path='/deliveries/add_new_delivery' exact component={addNewDelivery}/>
                        <Route path='/deliveries/unapproved_route' exact component={RouteManagement}/>
                        <Route path='/restaurants' exact component={Restaurants_Managements}/>
                        <Route path='/restaurants/add_new_restaurant' exact component={addNewRestaurant}/>
                        <Route path='/reports/DailyReports' exact component={DailyReports}/>
                        <Route path='/reports/WeeklyReports' exact component={WeeklyReports}/>
                        <Route path='/reports/MonthlyReports' exact component={MonthlyReports}/>
                        <Route path='/phone_receptionist/phone_receptionist_management' exact
                               component={PhoneReceptionistManagement}/>
                        <Route path='/phone_receptionist/add_phone_receptionist' exact
                               component={AddNewPhoneReceptionist}/>
                    </Switch>
                </Router>
            );
        }
        else {
            return (
                <Router>
                    <Sidebar/>
                    <Switch>
                        <Route path='/' exact component={Overview}/>
                        <Route path='/deliveries/DeliveryMan_Management' exact component={DeliveryMan_Management}/>
                        <Route path='/deliveries/DeliveriesHistory' exact component={DeliveriesHistory}/>
                        <Route path='/deliveries/add_new_delivery' exact component={addNewDelivery}/>
                        <Route path='/deliveries/unapproved_route' exact component={RouteManagement}/>
                        <Route path='/restaurants' exact component={Restaurants_Managements}/>
                    </Switch>
                </Router>
            );
        }
    }
    else {
        return (
            <Router>
                <Route path='/' exact component={LoginPage}/>
            </Router>
        )
    }
}
export default App;

function getData(dispatch) {
    deliverymanService.getAllDeliveryMen().then(response => {
        dispatch(setAllDeliverymen(response.data));
    })
        .catch(e => {
            console.error(e.message);
        });
    phoneReceptionistService.getAllPhoneReceptionists().then(response => {
        dispatch(setAllPhoneReceptionists(response.data));
    })
        .catch(e => {
            console.error(e.message);
        });
    deliveryService.getAllDeliveries().then(response => {
        dispatch(setAllDeliveries(response.data));
    })
        .catch(e => {
            console.error(e.message);
        });
    addressService.getAllAddresses().then(response => {
        dispatch(setAllAddresses(response.data));
    })
        .catch(e => {
            console.error(e.message);
        });
    restaurantService.getAllRestaurants().then(response => {
        dispatch(setAllRestaurants(response.data));
    })
        .catch(e => {
            console.error(e.message);
        });
    addressService.getAllCities().then(response => {
        dispatch(setAllCities(response.data));
    })
        .catch(e => {
            console.error(e.message);
        });
}