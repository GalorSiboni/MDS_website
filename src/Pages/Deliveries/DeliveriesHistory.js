import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Table, Button} from "react-bootstrap";
import restaurantService from "../../Services/restaurantService";
import RestaurantIdToRestaurantName from "../../Utils/RestaurantParsers";
import AddressIdToAddress from "../../Utils/AddressIdToAddressParsers";
import TimeLeftToDeliverCalculator from "../../Utils/TimeLeftToDeliverCalculator";
import DeliverymanIdToDeliverymanName from "../../Utils/DeliverymanIdToDeliverymanName";
import {Ring} from "react-awesome-spinners";

const DeliveriesHistory = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [currentRestaurantDeliveries, setCurrentRestaurantDeliveries] = useState(null);
    if (currentRestaurant !== null) {
        restaurantService.getDeliveryList(currentRestaurant).then(response => {
            setCurrentRestaurantDeliveries(response.data)
        }).catch(e => {
            console.error(e.message);
        });
    }
    return (
        <div>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
            <div>
                {isClicked
                    ?
                        [
                            currentRestaurantDeliveries !== null
                                ?
                                    <GridContainer myVar={setIsClicked} currentRestaurantDeliveries={currentRestaurantDeliveries} setCurrentRestaurantDeliveries={setCurrentRestaurantDeliveries} setCurrentRestaurant={setCurrentRestaurant} />
                                :
                                    <div style={{position: "fixed", top: "50%", left: "50%" , fontSize: '200%'}}>
                                        <Ring/>
                                    </div>
                        ]
                    :
                        <Restaurants_name_list myVar={setIsClicked} setCurrentRestaurant={setCurrentRestaurant}/> }
            </div>
        </div>
    );
};
export default DeliveriesHistory;

const Restaurants_name_list = (props) => {
    const setClicked = props.myVar
    const setCurrentRestaurant = props.setCurrentRestaurant

    return(
        <div className='restaurant_management' style={{alignItems: "center"}}>
            <div style={{textAlign: "center"}}>
            </div>
            <h1 style={{
                margin: 'auto',
                textAlign: 'right',
                color: '#052342',
                paddingRight: '10rem',
                fontSize: 40
            }}>:בחר מסעדה</h1>
            <div>
                <section className='restaurants' style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    {useSelector(state => state.allRestaurants).map((restaurant) => {
                        return <Restaurant key={restaurant.restaurantID} restaurant={restaurant} myVar={setClicked} setCurrentRestaurant={setCurrentRestaurant}/>
                    })}
                </section>
            </div>
        </div>
    );
}

const Restaurant = (props) =>{
    const { name , restaurantID} = props.restaurant;
    return (
        <>
            <Button variant="primary" onClick={() => {props.myVar(true) ; props.setCurrentRestaurant(restaurantID)}} style={{margin: 'auto', textAlign: 'Center', padding:'1rem'} }>{name}</Button>{' '}
        </>
    );
}

const GridContainer = (props) => {
    const setClicked = props.myVar
    const currentRestaurantDeliveries = props.currentRestaurantDeliveries

    return(
        <div style={{textAlign: "center"}}>
            <div style={{padding: '10px'}}>
                <button
                    onClick={
                    () => {setClicked(false) ;
                    props.setCurrentRestaurantDeliveries(null) ;
                    props.setCurrentRestaurant(null)}
                }
                    style={{
                        margin: 'auto',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 20
                    }}>חזור לרשימה</button>
            </div>
            <div style={{textAlign: "center"}}>
                    <div className="grid-container">
                    <div className="incidents_grid">
                        <h1 style={{textAlign:'center', textDecoration:'underline'}}>משלוחים</h1>
                        <div>
                            { currentRestaurantDeliveries.length === 0 ? (
                                    <div>אין משלוחים להציג</div>
                                ) :
                                <TableComponent myRestaurantDeliveries={currentRestaurantDeliveries} myVar={setClicked}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const TableComponent = (props) => {
        const data = props.myRestaurantDeliveries;

        let headings = Object.keys(data[0]);
        return (
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
                                    (heading === 'deliverymanID' ? <td>{DeliverymanIdToDeliverymanName(item[heading])}</td> :
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
        );
}

const Image = () => (
    <img className="logo"
         src={process.env.PUBLIC_URL + '/app_icon.png'}
         alt={""}
    />
)
