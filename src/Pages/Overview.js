import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import deliveryService from "../Services/deliveryService";
import {setAllDeliveries} from "../Actions";
import {Button, Dropdown, DropdownButton, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import phoneReceptionistService from "../Services/phoneReceptionistService";
import AddressIdToAddress from "../Utils/AddressIdToAddressParsers"
import { Ring } from 'react-awesome-spinners'
import DropdownItem from "react-bootstrap/DropdownItem";
import RestaurantIdToRestaurantName from "../Utils/RestaurantParsers";
import TimeLeftToDeliverCalculator from "../Utils/TimeLeftToDeliverCalculator";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";


const Overview = () => {
    const dispatch = useDispatch();
    const [dataAsArrived, setDataAsArrived] = useState(true)
    const [refreshRoutesBTN, setRefreshRoutesBTN] = useState(false)
    const [deliveries, setDeliveries] = useState(useSelector(state => state.allDeliveries));
    const [title, setTitle] = useState("רענון מידע כל 5 דקות");
    const refreshTimeOptions = ["דקה אחת", "5 דקות", "10 דקות"]
    const [refreshTimePick, setRefreshTimePick] = useState(null);
    switch (refreshTimePick){
        case refreshTimeOptions[0]:
            setTimeout(() => {setRefreshRoutesBTN(true); console.log(refreshTimePick)},60000); // Refresh data every 1 min
            break;
        case refreshTimeOptions[1]:
            setTimeout(() => {setRefreshRoutesBTN(true); console.log(refreshTimePick)},300000); // Refresh data every 5 min
            break;
        case refreshTimeOptions[2]:
            setTimeout(() => {setRefreshRoutesBTN(true); console.log(refreshTimePick)},600000); // Refresh data every 10 min
            break
        default:
    }
    if (refreshRoutesBTN){
        setDataAsArrived(false)
        setRefreshRoutesBTN(false)
        deliveryService.getAllDeliveries().then(response => {
            dispatch(setAllDeliveries(response.data));
            setDeliveries(response.data);
            setDataAsArrived(true)
        })
            .catch(e => {
                console.error(e.message);
            });
    }

    if (dataAsArrived)
        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <DropdownButton id="dropdown-basic-button" title={title} dir="RTL">
                        {refreshTimeOptions.map(i => { return <Dropdown.Item key={i} dir={"RTL"} onClick={() => {setTitle("רענן דף כל " + i);  setRefreshTimePick(i)}}>{i}</Dropdown.Item> })}
                    </DropdownButton>
                    <IconButton color="primary" aria-label="refreshRoute" component="span" onClick={() => setRefreshRoutesBTN(true)}>
                        <RefreshIcon/>
                    </IconButton>
                </div>
                <GridContainer deliveries={deliveries}/>
            </div>
        );
    else
        return (
            <div style={{position: "fixed", top: "50%", left: "50%" , fontSize: '200%'}}>
               <Ring/>
            </div>
        )
};
export default Overview;

const Image = () => (
    <img className="logo"
         src={process.env.PUBLIC_URL + '/app_icon.png'}
         alt={""}
    />
)

const GridContainer = (props) => {
    return(
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
            <div className="grid-container">
                <div className="incidents_grid">
                    <h1 style={{textAlign:'center', textDecoration:'underline'}}>משלוחים</h1>
                    <div>
                        {useSelector(state => state.allDeliveries).length === 0 ? (
                                <div>Loading...</div>
                            ) :
                            <TableComponent deliveries={props.deliveries}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

const HandleSubmit = (deliveryman,list) => {
    console.log(deliveryman.deliverymanID)
    console.log(list)
    if (list.length !== 0)
    phoneReceptionistService.setDeliverymanRoute(deliveryman.deliverymanID, list).then(() => {
        window.location.reload();
    }).catch(error => {
        console.log(error + "משהו השתבש בהקצאת השלוח, נא נסה שנית מאוחר יותר, שגיאה: ");
    });
}

function Checkbox(item, deliveries, setDeliveries) {
    const [checked, setChecked] = React.useState(false);
    return (
        <td>
            <label style={{paddingTop:'1rem'}}>
                <input type="checkbox"
                       defaultChecked={checked}
                       onChange={() => {
                           setChecked(!checked);
                           if (!checked) {
                                   const temp = deliveries;
                                   temp.push(item);
                                   setDeliveries(temp);
                               }
                               else {
                                   const temp = deliveries;
                                   setDeliveries(temp.filter(i => i.deliveryID !== item.deliveryID))
                               }
                           }
                       }
                />
                הקצה אותי
            </label>
        </td>
    );
}

const TableComponent = (props) => {
    let data = props.deliveries.filter(delivery => delivery.deliverymanID === null);
    data = data.filter(delivery => delivery.deliveryTime === null)
    const allDeliverymen = useSelector(state => state.allDeliveryMen);
    const [deliveries, setDeliveries] = useState([]);
    const [title, setTitle] = useState("בחר שליח");
    const [deliveryMan, setDeliveryMan] = useState(null);
    if (data.length === 0){
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>אין משלוחים לא מצוותים</tr>
                    </thead>
                </Table>
            </div>
        )
    }
    else {
        let headings = Object.keys(data[0]);

        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {
                            headings.map(heading => (heading === "restaurantID" ? <th>מסעדה</th> :
                                (heading === "deliverymanID" ? <th>שליח</th> :
                                    (heading === "receivedTime" ? <th>זמן קבלת המשלוח</th> :
                                        (heading === "receivedTimeDate" ? null :
                                            (heading === "deliveryTimeDate" ? null :
                                                (heading === "deleted" ? null :
                                                    (heading === "deliveryTimeDate" ? null :
                                                        (heading === "deliveryTime" ? null :
                                                            (heading === "addressID" ? <th>כתובת</th> :
                                                                (heading === "notes" ? null :
                                                                    (heading === "restaurantCost" ? null :
                                                                        (heading === "price" ? <th>מחיר משלוח</th> :
                                                                            (heading === "doTime" ? <th>זמן להשלמת המשלוח</th> :
                                                                                (heading === "deliveryID" ? null : <th>{heading}</th>)))))))))))))))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map(item =>
                            <tr>
                                {
                                    headings.map(heading =>
                                        (((heading === 'deliverymanID') && (item[heading] == null)) ? Checkbox(item.deliveryID,deliveries,setDeliveries) :
                                            (heading === 'restaurantID' ? <td>{RestaurantIdToRestaurantName(item[heading])}</td> :
                                                (heading === 'deliveryTimeDate' ? null :
                                                    (heading === 'deliveryID' ? null :
                                                        (heading === 'addressID' ? <td>{AddressIdToAddress(item[heading])}</td> :
                                                            (heading === 'restaurantCost' ? null :
                                                                (heading === 'deleted' ? null :
                                                                (heading === 'price' ? <td dir="RTL">{item[heading] + " שקלים"}</td> :
                                                                    (heading === 'receivedTimeDate' ? null :
                                                                    (heading === 'doTime' ? <td>{TimeLeftToDeliverCalculator(item)}</td> :
                                                                        (heading === 'deliveryTime' ? null :
                                                                            (heading === 'notes' ? null :
                                                                                <td>{item[heading]}</td>)))))))))))))
                                }
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                <DropdownButton title={title} style={{padding: '5px'}}>
                    {
                        allDeliverymen.map(deliveryman => (
                                    <DropdownItem onClick={() => {
                                        setDeliveryMan(deliveryman);
                                        setTitle(deliveryman.name)
                                    }}>
                                        {deliveryman.name}
                                    </DropdownItem>
                            ))
                    }
                </DropdownButton>
                <Button onClick={() => HandleSubmit(deliveryMan, deliveries)} style={{padding: '5px', marginBottom: '10px'}}>
                    הקצה משלוחים לשליח
                </Button>
            </div>
        );
    }
}
