import phoneReceptionistService from "../../Services/phoneReceptionistService";
import {useSelector} from "react-redux";
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import React, {useState} from "react";
import deliveryService from "../../Services/deliveryService";
import addressService from "../../Services/addressService";
import AddressParsers from "../../Utils/AddressParsers";

const RouteManagement = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentDeliveryMan, setCurrentDeliveryMan] = useState();
    const [refreshRoutesBTN, setRefreshRoutesBTN] = useState(true)
    const [deliverymen, setDeliverymen] = useState([]);
    const [allUnapprovedRoutes, setAllUnapprovedRoutes] = useState([]);

    if (refreshRoutesBTN){
        setRefreshRoutesBTN(false)
        setDeliverymen([]);
        setAllUnapprovedRoutes([]);
        phoneReceptionistService.getAllUnapprovedRoutes().then(response => {
            setAllUnapprovedRoutes(response.data);
            for (let i = 0; i < allUnapprovedRoutes.length; i++) {
                setDeliverymen(oldArray => [...oldArray, allUnapprovedRoutes[i].deliverymanID]);
            }
        })
                .catch(e => {
                    console.error(e.message);
                });
    }
    return(
        <div>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
            <div style={{textAlign: "center"}}>
                <IconButton color="primary" aria-label="refreshRoute" component="span">
                    <RefreshIcon onClick={() => setRefreshRoutesBTN(true)}/>
                </IconButton>
            </div>
            {isClicked
                ?
                    <Delivery_man_details myVar={setIsClicked} current={currentDeliveryMan} allUnapprovedRoutes={allUnapprovedRoutes}/>
                :
                    <Delivery_man_name_list myVar={setIsClicked} current={setCurrentDeliveryMan} deliverymenList={deliverymen} /> }
        </div>
    );
};
export default RouteManagement;

const Delivery_man_name_list = (props) => {
    const setClicked = props.myVar
    const setCurrentDeliveryMan = props.current
    const deliverymen = props.deliverymenList;

    return(
        <div className='deliveryman_management' style={{alignItems: "center"}}>
            {(deliverymen.length !== 0 ?
                <div>
                    <h1 style={{
                        margin: 'auto',
                        textAlign: 'right',
                        color: '#052342',
                        paddingRight: '10rem',
                        fontSize: 40
                    }}>:שליחים הממתינים לאישור מסלול
                    </h1>
                <div>
                    <section className='delivery_man_list' style={{alignItems: "center"}}>
                        {deliverymen.map(delivery_man => {
                            return <Delivery_man key={delivery_man.deliverymanID} delivery_man={delivery_man} myVar={setClicked} current={setCurrentDeliveryMan}/>
                        })}
                    </section>
                </div>
            </div> : <h1 style={{
                margin: 'auto',
                textAlign: 'right',
                color: '#052342',
                paddingRight: '10rem',
                fontSize: 40
            }}>אין שליחים הממתינים לאישור מסלול
            </h1>)}
        </div>
    );
}

const Delivery_man_details = (props) =>  {
    const currentDeliveryManID = props.current
    const setClicked = props.myVar
    const allUnapprovedRoutes = props.allUnapprovedRoutes
    const route = allUnapprovedRoutes.find(route => route.deliverymanID === currentDeliveryManID);


    return(
        <div style={{textAlign: "center"}}>
            <button onClick={() => setClicked(false)} style={{
                margin: 'auto',
                textAlign: 'center',
                color: 'black',
                fontSize: 20
            }}>חזור לרשימה</button>
            <h1 style={{
                margin: 'auto',
                textAlign: 'right',
                color: '#052342',
                paddingRight: '10rem',
                fontSize: 40
            }}>מסלול:</h1>
            <Route route={route}/>
        </div>
    )
}

const Delivery_man = (props) =>{
    return (
        <article className='delivery_man'  style={{textAlign: "center"}}>
            <h2 onClick={() => {props.myVar(true) ; props.current(props.delivery_man.deliverymanID)}}>{GetDeliveryManName(props.delivery_man)}</h2>
        </article>
    );
}

const Route = (props) =>{
    const { deliverymanID, deliveries } = props.route;
    const allDeliveries = [];
    const allAddresses = [];
    if (deliveries)
        for (let i = 0; i < deliveries.length; i++) {
            deliveryService.getDelivery(deliveries[i].deliveryID).then(response => {
                allDeliveries.push(response.data);
                addressService.getAddress(response.data.addressID).then(response => {
                    allAddresses.push(response.data);
                }).catch(e => {
                    console.log(e);
                });
            })
            .catch(e => {
                console.log(e);
            });
        }
    return (
        <article className='route'>
            <ul  style={{position: 'absolute', right: '40%'}} dir="RTL">
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } >{"שליח: " + useSelector(state => state.allDeliveryMen).find(deliveryman => deliveryman.deliverymanID === deliverymanID).name}</li>
                {((allDeliveries.length === allAddresses.length) || allAddresses.length !== 0 ?
                <ul>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} }>{"מסלול חלוקה: "}</li>
                    <ul>
                        <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '4rem'}}>{"משלוחים:"}</li>
                        <ul>
                            {allDeliveries.map(i => { return <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'}}>{AddressParsers(i.addressID)}</li> })}
                        </ul>
                    </ul>
                </ul>
                        : <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} }>{"מסלול חלוקה: לא הוקצה מסלול"}</li>
                )}
            </ul>
        </article>
    );
}

const Image = () => (
    <img className="logo"
         src={process.env.PUBLIC_URL + '/app_icon.png'}
         alt={""}
    />
)

function GetDeliveryManName(id) {
    const deliveryman = useSelector(state => state.allDeliveryMen).find(item => item.deliverymanID === id);
    return deliveryman.name;
}