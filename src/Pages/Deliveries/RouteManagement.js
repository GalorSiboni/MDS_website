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
                <IconButton color="primary" aria-label="refreshRoute" component="span" onClick={() => setRefreshRoutesBTN(true)}>
                    <RefreshIcon/>
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
    const [route, setRoute] = useState(props.allUnapprovedRoutes.find(route => route.deliverymanID === props.current));

    return(
        <div style={{textAlign: "center"}}>
            <button onClick={() => props.myVar(false)} style={{
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
            {route !== undefined ? <Route route={route}/> : <h2> בטעינה...</h2>}

        </div>
    )
}

const Delivery_man = (props) =>{
    return (
        <article className='delivery_man'  style={{textAlign: "center"}}>
            <h2 onClick={() => {props.myVar(true) ; props.current(props.delivery_man)}}>{GetDeliveryManName(props.delivery_man)}</h2>
        </article>
    );
}

const Route = (props) =>{
    const allDeliveries = [];
    const allAddresses = [];
    if (props.route !== undefined)
        if (props.route.deliveries !== undefined)
        for (let i = 0; i < props.route.deliveries.length; i++) {
            deliveryService.getDelivery(props.route.deliveries[i]).then(response => {
                allDeliveries.push(response.data);
                allAddresses.push(AddressParsers(response.data.addressID));
            })
            .catch(e => {
                console.error(e.message);
            });
        }
    return (
        <article className='route'>
            <ul  style={{position: 'absolute', right: '40%'}} dir="RTL">
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } >{"שליח: " + useSelector(state => state.allDeliveryMen).find(deliveryman => deliveryman.deliverymanID === props.route.deliverymanID).name}</li>
                {((allDeliveries.length === allAddresses.length) || allAddresses.length !== 0 ?
                <ul style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem',  paddingRight: '4rem'} }>
                    <li>{"מסלול חלוקה: "}</li>
                    <ul style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '4rem'}}>
                        {allDeliveries.map(i => { return <li>{AddressParsers(i.addressID)}</li> })}
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