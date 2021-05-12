import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import deliveryService from "../Services/deliveryService";
import {setAllDeliveries} from "../Actions";
import {Button, DropdownButton, Spinner, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import phoneReceptionistService from "../Services/phoneReceptionistService";
import DropdownItem from "react-bootstrap/DropdownItem";


const Overview = () => {
    const dispatch = useDispatch();
    deliveryService.getAllDeliveries().then(response => {
        dispatch(setAllDeliveries(response.data));
    })
        .catch(e => {
            console.log(e);
        });
    return (
        <div>
            <GridContainer/>
        </div>
    );
};
export default Overview;

const Image = () => (
    <img className="logo"
         src={process.env.PUBLIC_URL + '/app_icon.png'}
         alt={""}
    />
)

const GridContainer = () => {
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
                            <TableComponent/>
                        }
                    </div>
                </div>
                <div className="filters">
                    <h1 style={{textAlign:'center', textDecoration:'underline'}}>פילטרים</h1>
                </div>
            </div>
        </div>
    );
}

const HandleSubmit = (deliveryman,list, props) => {
    if (deliveryman != null && list.length != 0)
    phoneReceptionistService.setDeliverymanRoute(deliveryman.deliverymanID, list).then(
    ).catch(error => {
        props.history.push('/');
        console.log(error + "משהו השתבש בהקצאת השלוח, נא נסה שנית מאוחר יותר, שגיאה: ");
    });
}

function Checkbox(item, deliveries, setDeliveries) {
    const [checked, setChecked] = React.useState(false);
    console.log(deliveries)
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

const TableComponent = () => {
    const data = useSelector(state => state.allDeliveries);
    const allDeliverymen = useSelector(state => state.allDeliveryMen);
    const allRestaurants = useSelector(state => state.allRestaurants);
    const [deliveries, setDeliveries] = useState([]);
    const [title, setTitle] = useState("בחר שליח");
    const [deliveryMan, setDeliveryMan] = useState(null);
    let headings = Object.keys(data[1]);
    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    {
                        headings.map(heading => (heading == "restaurantID" ? <th>מסעדה</th> :
                            (heading == "deliverymanID" ? <th>שליח</th> :
                                (heading == "receivedTime" ? <th>זמן קבלת המשלוח</th> :
                                    (heading == "receivedTimeDate" ? null :
                                        (heading == "deliveryTimeDate" ? null :
                                            (heading == "deleted" ? null :
                                                (heading == "deliveryTimeDate" ? null :
                                                    (heading == "deliveryTime" ? null :
                                                        (heading == "addressID" ? <th>כתובת</th> :
                                                            (heading == "notes" ? null :
                                                                (heading == "restaurantCost" ? null :
                                                                    (heading == "price" ? <th>מחיר משלוח</th> :
                                                                        (heading == "doTime" ? <th>זמן להשלמת המשלוח</th> :
                                                                            (heading == "deliveryID" ? null : <th>{heading}</th>)))))))))))))))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data.map(item =>
                        (item.deliveryTime !== null ? null :(<tr>
                            {
                                headings.map(heading =>
                                    ((heading === 'deliverymanID') && (item[heading] === null)) ? Checkbox(item,deliveries,setDeliveries) :
                                        (heading === 'restaurantID' ? <td>{allRestaurants.find(restaurant => restaurant.restaurantID == item[heading]).name}</td> :
                                            (heading === 'deliveryTimeDate' ? null :
                                                (heading === 'deliveryID' ? null :
                                                (heading === 'restaurantCost' ? null :
                                                (heading === 'deleted' ? null :
                                                (heading === 'receivedTimeDate' ? null :
                                                        (heading === 'deliveryTime' ? null :
                                                    (heading === 'notes' ? null : <td>{item[heading]}</td>)))))))))
                            }
                        </tr>))
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
