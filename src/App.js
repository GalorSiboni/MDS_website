import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview  from './Pages/Overview';
import LoginPage from './Pages/LoginPage';
import Restaurants_Managements from './Pages/Restaurant/Restaurants_Management';
import addNewRestaurant from './Pages/Restaurant/addNewRestaurant';
import DeliveryMan_Management from './Pages/Deliveries/DeliveryMan_Management';
import DeliveriesHistory from './Pages/Deliveries/DeliveriesHistory';
import { DailyReports, WeeklyReports, MonthlyReports } from './Pages/Reports';
import { AddNewPhoneReceptionist, PhoneReceptionistManagement } from './Pages/PhoneReceptionist/PhoneReceptionistManagement';
import {useSelector} from "react-redux";
import addNewDeliveryMan from "./Pages/Deliveries/addNewDeliveryMan";

function App() {
    const isLogged = useSelector(state => state.isLogged);
    if (isLogged) {
        return (
            <Router>
                <Sidebar/>
                <Switch>
                    <Route path='/' exact component={Overview}/>
                    <Route path='/deliveries/DeliveryMan_Management' exact component={DeliveryMan_Management}/>
                    <Route path='/deliveries/DeliveriesHistory' exact component={DeliveriesHistory}/>
                    <Route path='/deliveries/add_new_delivery_man' exact component={addNewDeliveryMan}/>
                    <Route path='/restaurants' exact component={Restaurants_Managements}/>
                    <Route path='/restaurants/add_new_restaurant' exact component={addNewRestaurant}/>
                    <Route path='/reports/DailyReports' exact component={DailyReports}/>
                    <Route path='/reports/WeeklyReports' exact component={WeeklyReports}/>
                    <Route path='/reports/MonthlyReports' exact component={MonthlyReports}/>
                    <Route path='/phone_receptionist/phone_receptionist_management' exact component={PhoneReceptionistManagement}/>
                    <Route path='/phone_receptionist/add_phone_receptionist' exact component={AddNewPhoneReceptionist}/>
                </Switch>
            </Router>
        );
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
