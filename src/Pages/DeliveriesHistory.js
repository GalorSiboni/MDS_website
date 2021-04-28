import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import deliveryService from "../Services/deliveryService";
import {setAllDeliveries, setAllRestaurants} from "../Actions";
import {Table, Button} from "react-bootstrap";
import restaurantService from "../Services/restaurantService";
import {forEach} from "react-bootstrap/ElementChildren";

const DeliveriesHistory = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentRestaurant, setCurrentRestaurant] = useState();
    const dispatch = useDispatch();
    deliveryService.getAllDeliveries().then(response => {
        dispatch(setAllDeliveries(response.data));
    })
        .catch(e => {
            console.log(e);
        });
    restaurantService.getAllRestaurants().then(response => {
        dispatch(setAllRestaurants(response.data));
    })
        .catch(e => {
            console.log(e);
        });
    return (
        <div>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
            <div>
                {isClicked ? <GridContainer myVar={setIsClicked} current={currentRestaurant}/> : <Restaurants_name_list myVar={setIsClicked} current={setCurrentRestaurant}/> }
            </div>
        </div>
    );
};
export default DeliveriesHistory;

const Restaurants_name_list = (props) => {
    const setClicked = props.myVar
    const setCurrentRestaurant = props.current

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
                        return <Restaurant key={restaurant.restaurantID} restaurant={restaurant} myVar={setClicked} current={setCurrentRestaurant}></Restaurant>
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
            <Button variant="primary" onClick={() => {props.myVar(true) ; props.current(restaurantID)}} style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{name}</Button>{' '}
        </>
    );
}

const GridContainer = (props) => {
    const setClicked = props.myVar
    const currentRestaurantDeliveries = GetRestaurantDeliveriesByID(props.current)
    return(
        <div style={{textAlign: "center"}}>
            <div style={{padding: '10px'}}>
                <button onClick={() => setClicked(false)} style={{
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
                            {(currentRestaurantDeliveries === null || currentRestaurantDeliveries.length === 0) ? (
                                    <div>אין משלוחים להציג</div>
                                ) :
                                <TableComponent myRestaurantDeliveries={currentRestaurantDeliveries}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const TableComponent = (props) => {
    let data = [] ;
    for (let i = 0; i < props.myRestaurantDeliveries.length; i++) {
        data.push(GetDeliveryByID(props.myRestaurantDeliveries[i]));
    }
    data = useSelector(state => state.allDeliveries)
    let headings = Object.keys(data[0]);
    return (
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
                   <tr>
                        {
                            headings.map(heading => <td>{item[heading]}</td>)
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
    />
)
function GetRestaurantDeliveriesByID (restaurantID) {
    return useSelector(state => state.allRestaurants).find(x => x.restaurantID === restaurantID).deliveries;
}
function GetDeliveryByID (deliveryID) {
        deliveryService.getDelivery(deliveryID).then(respone => {
            return respone.data
        })
            .catch(e => {
                console.log(e);
            });
}