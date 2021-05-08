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

const handleSubmit = (deliveryman,list) => {
    phoneReceptionistService.setDeliverymanRoute(deliveryman.deliverymanID, list).then().catch(error => {
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
                        headings.map(heading => <th>{heading}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data.map(item =>
                        (item.receivedTimeDate !== null ? null :(<tr>
                            {
                                headings.map(heading =>
                                    ((heading === 'deliverymanID') && (item[heading] === null)) ? Checkbox(item,deliveries,setDeliveries) : <td>{item[heading]}</td>)
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
            <Button onClick={() => handleSubmit(deliveryMan, deliveries)} style={{padding: '5px', marginBottom: '10px'}}>
                הקצה משלוחים לשליח
            </Button>
        </div>

    );
}
