import React, {useState} from 'react';
import deliverymanService from "../../Services/deliverymanService";
import {useDispatch} from "react-redux";
import { setAllDeliverymen } from "../../Actions";
import shiftService from "../../Services/shiftService";
import { useSelector } from "react-redux";

const DeliveryMan_Management = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentDeliveryMan, setCurrentDeliveryMan] = useState();
    const dispatch = useDispatch();

    deliverymanService.getAllDeliveryMen().then(response => {
        dispatch(setAllDeliverymen(response.data));
    })
        .catch(e => {
            console.error(e.message);
        });
    return(
    <div>
            {isClicked ? <Delivery_man_details myVar={setIsClicked} current={currentDeliveryMan}/> : <Delivery_man_name_list myVar={setIsClicked} current={setCurrentDeliveryMan}/> }
    </div>
    );
};
export default DeliveryMan_Management;

const Delivery_man_name_list = (props) => {
    const setClicked = props.myVar
    const setCurrentDeliveryMan = props.current

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
                    {useSelector(state => state.allDeliveryMen).map((delivery_man) => {
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
            }}>:דף שליח</h1>
            <Delivery_man_full delivery_man={deliveryMan}/>
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

const Delivery_man_full = (props) =>{
    const { deliverymanID, name, phoneNumber, location, shiftID, deleted} = props.delivery_man;
    //get Route
    const [route, setRoute] = useState("");
    deliverymanService.deliverymanGetRoute(deliverymanID).then(response => {
        console.log(response.data)
        setRoute(response.data);
    })
        .catch(e => {
            console.log(e);
        });
    //get shift
    const [currentShift, setCurrentShift] = useState("");
    if(currentShift === "")
        shiftService.getShift(shiftID).then(response => {
            setCurrentShift(response.data);
        })
            .catch(e => {
                console.log(e);
            })

    function HandleShiftConfirmation(shift) {
        const tempShift = shift;
        console.log(shift)
        tempShift.confirmed = true;
        shiftService.updateShift(tempShift).then((result) => {
            console.log(result.data)
        }).catch(error => {
            console.error(error.message)
        })
    }

    return (

            <article className='delivery_man'>
                <ul  style={{position: 'absolute', right: '40%'}} dir="RTL">
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } dir="RTL">{"מזהה שליח: " + deliverymanID}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"שם השליח: " + name}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מס' טלפון: " + phoneNumber}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מיקום: " + location}</li>
                    {(currentShift !== "")
                        ?
                        (
                            <ul dir="RTL">
                                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'1rem'} }>{"משמרת:"}</li>
                                <ul style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '2rem'}}>
                                    <li>{"מס' עובד:" + currentShift.workerID}</li>
                                    <li>{"זמן תחילת משמרת:" + currentShift.shiftStart}</li>
                                    {(currentShift.isConfirmed === undefined || currentShift.isConfirmed === false ? ( currentShift.shiftStart !== undefined ? <li> <button onClick={() => HandleShiftConfirmation(currentShift)} style={{
                                        margin: 'auto',
                                        textAlign: 'center',
                                        color: 'black',
                                        fontSize: 20
                                    }}>אישור משמרת</button></li>  : <li>{"סטטוס אישור משמרת: לא במשמרת" }</li> ) : <li>{"סטטוס אישור משמרת: משמרת אושרה" }</li>)}
                                </ul>
                            </ul>
                        )
                        : <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"משמרת: לא במשמרת"}</li>
                    }

                    {(route !== null && route !== undefined && route !== "")
                        ?
                        (
                            <ul style={{paddingRight: '25rem'}} dir="RTL">
                                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מסלול חלוקה: " + route}</li>
                                <ul>
                                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '4rem'} } dir="RTL">{"משלוחים:"}</li>
                                    <ul>
                                        {route.deliveries.map(i => { return <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{i}</li> })}
                                    </ul>
                                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '4rem'} } dir="RTL">{(route.isApproved === false || route.isApproved === undefined) ? "סטטוס אישור מסלול: לא מאושר" : "סטטוס  אישור מסלול: מאושר"}</li>
                                </ul>
                            </ul>
                        )
                        : <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מסלול חלוקה: לא הוקצה מסלול"}</li>
                    }
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{(deleted === false || deleted === undefined) ? "סטטוס שליח: לא פעיל" : "סטטוס שליח: פעיל"}</li>
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
