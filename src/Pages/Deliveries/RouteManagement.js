import phoneReceptionistService from "../../Services/phoneReceptionistService";
import {setAllDeliverymen, setAllUnapprovedRoutes} from "../../Actions";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import deliverymanService from "../../Services/deliverymanService";
import deliveryService from "../../Services/deliveryService";

const RouteManagement = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentDeliveryMan, setCurrentDeliveryMan] = useState();
    const dispatch = useDispatch();
    phoneReceptionistService.getAllUnapprovedRoutes().then(response => {
        dispatch(setAllUnapprovedRoutes(response.data));
    })
        .catch(e => {
            console.log(e);
        });
    deliverymanService.getAllDeliveryMen().then(response => {
        dispatch(setAllDeliverymen(response.data));
    })
        .catch(e => {
            console.log(e);
        });
    return(
        <div>
            {isClicked ? <Delivery_man_details myVar={setIsClicked} current={currentDeliveryMan}/> : <Delivery_man_name_list myVar={setIsClicked} current={setCurrentDeliveryMan}/> }
        </div>
    );
};
export default RouteManagement;


const Delivery_man_name_list = (props) => {
    const setClicked = props.myVar
    const setCurrentDeliveryMan = props.current
    const unApprovedRoutes = useSelector(state => state.allUnapprovedRoutes)
    let deliverymen = useSelector(state => state.allDeliveryMen);
    setTimeout(function() {

        const deliverymanID = unApprovedRoutes.map(unApprovedRoute => {deliverymanID.push(unApprovedRoute.deliverymanID)});
        if (unApprovedRoutes.length == 0)
            deliverymen = [];
        unApprovedRoutes.map(item => deliverymen.filter(deliveryman => deliveryman.deliverymanID == item.deliverymanID));
        console.log(deliverymen)
    }, 1000)
    return(
        <div className='deliveryman_management' style={{alignItems: "center"}}>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
            <h1 style={{
                margin: 'auto',
                textAlign: 'right',
                color: '#052342',
                paddingRight: '10rem',
                fontSize: 40
            }}>:שליחים</h1>
            <div>
                <section className='delivery_man_list'>
                    {deliverymen.map((delivery_man) => {
                        return <Delivery_man key={delivery_man.deliverymanID} delivery_man={delivery_man} myVar={setClicked} current={setCurrentDeliveryMan}></Delivery_man>
                    })}
                </section>
            </div>
        </div>
    );
}

const Delivery_man_details = (props) =>  {
    const currentDeliveryManID = props.current
    const setClicked = props.myVar
    const deliveryMan = useSelector(state => state.allDeliveryMen).find(x => x.deliverymanID === currentDeliveryManID);


    return(
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
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
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } dir="RTL">{"מזהה שליח: " + deliverymanID}</li>
                <ul style={{paddingRight: '25rem'}} dir="RTL">
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מסלול חלוקה: "}</li>
                    <ul>
                        <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '4rem'} } dir="RTL">{"משלוחים:"}</li>
                        <ul>
                            {deliveries.map(i => { return <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{i}</li> })}
                        </ul>
                    </ul>
                </ul>
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
