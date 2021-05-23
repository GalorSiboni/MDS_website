import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import deliveryService from "../Services/deliveryService";
import {setAllDeliveries} from "../Actions";
import {Button, DropdownButton, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import phoneReceptionistService from "../Services/phoneReceptionistService";
import AddressIdToAddress from "../Utils/AddressParsers"
import RestaurantIdToRestaurant from "../Utils/RestaurantParsers"
import DropdownItem from "react-bootstrap/DropdownItem";

const Overview = () => {
    const dispatch = useDispatch();
    const [dataAsArrived, setDataAsArrived] = useState(false)
    deliveryService.getAllDeliveries().then(response => {
        dispatch(setAllDeliveries(response.data));
        setDataAsArrived(true);
    })
        .catch(e => {
            console.log(e);
        });
    if (dataAsArrived)
        return (
            <div>
                <GridContainer/>
            </div>
        );
    else
        return (
            <div>
                טוען מידע
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
            </div>
        </div>
    );
}

const HandleSubmit = (deliveryman,list) => {
    console.log(deliveryman.deliverymanID)
    console.log(list)
    if (deliveryman != null && list.length != 0)
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

const TableComponent = () => {
    const data = useSelector(state => state.allDeliveries).filter(delivery => delivery.deliverymanID == null);
    const allDeliverymen = useSelector(state => state.allDeliveryMen);
    const [deliveries, setDeliveries] = useState([]);
    const [title, setTitle] = useState("בחר שליח");
    const [deliveryMan, setDeliveryMan] = useState(null);
    if (data.length == 0){
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
        if (data == allDeliverymen)
            return (
                <div>
                    טוען מידע
                </div>
            )
        else
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
                            <tr>
                                {
                                    headings.map(heading =>
                                        (((heading === 'deliverymanID') && (item[heading] == null)) ? Checkbox(item.deliveryID,deliveries,setDeliveries) :
                                            (heading === 'restaurantID' ? <td>{RestaurantIdToRestaurant(item[heading])}</td> :
                                                (heading === 'deliveryTimeDate' ? null :
                                                    (heading === 'deliveryID' ? null :
                                                        (heading === 'addressID' ? <td>{AddressIdToAddress(item[heading])}</td> :
                                                            (heading === 'restaurantCost' ? null :
                                                                (heading === 'deleted' ? null :
                                                                    (heading === 'receivedTimeDate' ? null :
                                                                        (heading === 'deliveryTime' ? null :
                                                                            (heading === 'notes' ? null :
                                                                                <td>{item[heading]}</td>)))))))))))
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

function cityTranslate(city) {
    let translate = "";
    switch (city){
        case "ROSH_AAYIN":
            translate = "ראש העין";
            break;
        case "ORANIT":
            translate = "אורנית";
            break;
        case "SHAAREI_TIKVA":
            translate = "שערי תקווה";
            break;
        case "ELKANA":
            translate = "אלקנה";
            break;
        case "ETZ_EFRAIM":
            translate = "עץ אפריים";
            break;
        case "HAGOR":
            translate = "חגור";
            break;
        case "MATAN":
            translate = "מתן";
            break;
        case "NIRIT":
            translate = "נירית";
            break;
        case "YARHIV":
            translate = "ירחיב";
            break;
        case "SHOHAM":
            translate = "שהם";
            break;
        case "GIVAT_HASHLOSHA":
            translate = "גבעת השלושה";
            break;
        case "NAHSHONIM_BASE":
            translate = "בסיס נחשונים";
            break;
        case "KFAR_SABA":
            translate = "כפר סבא";
            break;
        case "TEL_AVIV":
            translate = "תל-אביב";
            break;
        case "KFAR_KASEM":
            translate = "כפר קאסם";
            break;
        case "OTHER":
            translate = "אחר";
            break;
        case "NAHSHONIM":
            translate = "נחשונים";
            break;
        case "PETAH_TIKVA":
            translate = "פתח תקווה";
            break;
        case "EINAT":
            translate = "עינת";
            break;
        default:
    }
    return translate;
}

