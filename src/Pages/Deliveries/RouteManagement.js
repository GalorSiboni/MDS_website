import phoneReceptionistService from "../../Services/phoneReceptionistService";
import {useSelector} from "react-redux";
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import React, {useState} from "react";
import deliveryService from "../../Services/deliveryService";

const RouteManagement = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentDeliveryMan, setCurrentDeliveryMan] = useState();
    const [refreshRoutesBTN, setRefreshRoutesBTN] = useState(false)
    const [deliverymen, setDeliverymen] = useState([]);
    const [allUnapprovedRoutes, setAllUnapprovedRoutes] = useState([]);

    if (refreshRoutesBTN){
        setRefreshRoutesBTN(false)
        setDeliverymen([]);
        setAllUnapprovedRoutes([]);
        phoneReceptionistService.getAllUnapprovedRoutes().then(response => {
            setAllUnapprovedRoutes(response.data);
            for (let i = 0; i < allUnapprovedRoutes.length; i++) {
                deliverymen.push(allUnapprovedRoutes[i].deliverymanID);
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
            {isClicked ? <Delivery_man_details myVar={setIsClicked} current={currentDeliveryMan} allUnapprovedRoutes={allUnapprovedRoutes}/> : <Delivery_man_name_list myVar={setIsClicked} current={setCurrentDeliveryMan} deliverymenList={deliverymen} /> }
        </div>
    );
};
export default RouteManagement;


const Delivery_man_name_list = (props) => {
    const setClicked = props.myVar
    const setCurrentDeliveryMan = props.current
    const deliverymen = props.deliverymenList;
    console.log(deliverymen)
    return(
        <div className='deliveryman_management' style={{alignItems: "center"}}>
            {(deliverymen.length > 0 ? <div>
                <h1 style={{
                    margin: 'auto',
                    textAlign: 'right',
                    color: '#052342',
                    paddingRight: '10rem',
                    fontSize: 40
                }}>:שליחים הממתינים לאישור מסלול
                </h1>
                <div>
                    <section className='delivery_man_list'>
                        {deliverymen.map((delivery_man) => {
                            return <Delivery_man key={delivery_man.deliverymanID} delivery_man={delivery_man} myVar={setClicked} current={setCurrentDeliveryMan}></Delivery_man>
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
    const deliveryMan = useSelector(state => state.allDeliveryMen).find(x => x.deliverymanID === currentDeliveryManID);


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
            <Route delivery_man={deliveryMan}/>
        </div>
    )
}

const Delivery_man = (props) =>{
    const { name , deliverymanID} = props.delivery_man;
    return (
        <article className='delivery_man'>
            <h2 onClick={() => {props.myVar(true) ; props.current(deliverymanID)}} style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{name}</h2>
        </article>
    );
}

const Route = (props) =>{
    const { deliverymanID, deliveries } = props.delivery_man;
    const allDeliveries = [];
    if (deliveries)
        for (let i = 0; i < deliveries.length; i++) {
            deliveryService.getDelivery(deliveries[i].deliveryID).then(response => {
                allDeliveries.push(response.data);
            })
                .catch(e => {
                    console.log(e);
                });
        }
    return (
        <article className='route'>
            <ul  style={{position: 'absolute', right: '40%'}} dir="RTL">
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } >{"מזהה שליח: " + deliverymanID}</li>
                {(deliveries ?
                <ul>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} }>{"מסלול חלוקה: "}</li>
                    <ul>
                        <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '4rem'}}>{"משלוחים:"}</li>
                        <ul>
                            {allDeliveries.map(i => { return <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'}}>{i}</li> })}
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

