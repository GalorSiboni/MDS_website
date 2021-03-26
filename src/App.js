import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview from './Pages/Overview';
import LoginPage from './Pages/LoginPage';
import {Deliveries, DeliveriesManagement, DeliveriesHistory} from './Pages/Deliveries';
import { Reports, DailyReports, WeeklyReports, MonthlyReports } from './Pages/Reports';

function App() {
    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route path='/overview' exact component={Overview} />
                <Route path='/login' exact component={LoginPage} />
                <Route path='/deliveries' exact component={Deliveries} />
                <Route path='/deliveries/DeliveriesManagement' exact component={DeliveriesManagement} />
                <Route path='/deliveries/DeliveriesHistory' exact component={DeliveriesHistory} />
                <Route path='/reports' exact component={Reports} />
                <Route path='/reports/DailyReports' exact component={DailyReports} />
                <Route path='/reports/WeeklyReports' exact component={WeeklyReports} />
                <Route path='/reports/MonthlyReports' exact component={MonthlyReports} />
            </Switch>
        </Router>
    );
}
// import './App.css';
// import LoginPage from './Pages/LoginPage';
//
// function App() {
//     return (
//         <div className="App">
//             <LoginPage/>
//         </div>
//     );
// }
// const Logo = () => (
//   <img
//       src='https://resizeimage.net/mypic/jOZi3pkOkzXXnkg8/RTWMo/app_icon.png'
//       alt=''
//        />
// )
export default App;
