import React, {useState} from 'react';
import deliverymanService from "../Services/deliverymanService";
import {useDispatch} from "react-redux";
import { setAllDeliverymen } from "../Actions";
import shiftService from "../Services/shiftService";
import { useSelector } from "react-redux";

const DeliveryMan_Management = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentDeliveryMan, setCurrentDeliveryMan] = useState();
    const dispatch = useDispatch();


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
    const currentDeliveryMan = props.current
    const setClicked = props.myVar

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
            <Delivery_man_full delivery_man={useSelector(state => state.allDeliveryMen).find(x => x.deliverymanID === currentDeliveryMan)}/>
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
    let route;
    // deliverymanService.deliverymanGetRoute(deliverymanID, location).then(response => {
    //     console.log(response.data)
    //     route = response.data;
    // })
    //     .catch(e => {
    //         console.log(e);
    //     });
    let currentShift = "6085db21e7cb2835fd38bfda";
    shiftService.getShift(currentShift).then(response => {
        console.log(response.data.shiftStart)
        currentShift = response.data;
    })
        .catch(e => {
            console.log(e);
        });
        return (
            <article className='delivery_man'>
                <ul  style={{paddingRight: '25rem'}} dir="RTL">
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } dir="RTL">{"מזהה שליח: " + deliverymanID}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"שם השליח: " + name}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מס' טלפון: " + phoneNumber}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מיקום: " + location}</li>
                    {(currentShift != null)
                        ?
                        (
                            <ul dir="RTL">
                                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'1rem'} }>{"משמרת:"}</li>
                                <ul style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '2rem'}}>
                                    <li>{"מס' עובד:" + currentShift.workerID}</li>
                                    <li>{"זמן תחילת משמרת:" + currentShift.shiftStart}</li>
                                    <li>{"סטטוס אישור משמרת:" + currentShift.isConfirmed}</li>
                                </ul>
                            </ul>
                        )
                        : <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"משמרת: לא במשמרת"}</li>
                    }

                    {(route != (null || undefined))
                        ?
                        (
                            <ul style={{paddingRight: '25rem'}} dir="RTL">
                                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מסלול חלוקה: " + route}</li>
                                <ul>
                                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '4rem'} } dir="RTL">{"משלוחים:"}</li>
                                    <ul>
                                        {route.deliveries.map(i => { return <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{i}</li> })}
                                    </ul>
                                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingRight: '4rem'} } dir="RTL">{(route.isApproved == (false || undefined)) ? "סטטוס אישור מסלול: לא מאושר" : "סטטוס  אישור מסלול: מאושר"}</li>
                                </ul>
                            </ul>
                        )
                        : <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מסלול חלוקה: לא הוקצה מסלול"}</li>
                    }
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{(deleted == (false || undefined)) ? "סטטוס שליח: לא פעיל" : "סטטוס שליח: פעיל"}</li>
                </ul>
            </article>
        );
}

const Image = () => (
    <img className="logo"
        src='https://lh3.googleusercontent.com/acEcG4_q_hqOkdaUzmmtXbr4OemMx-PR_u5lUGnap5EWVg6tggLMMsxws1sBDWw35AyPOiXm726eBF0TtgmokgZj1G8TquZgTio5a90JB1ZFvjjfFzPhrzPBhcOp5OfiaQRjM-TqBmozIoHpMR8s1uLgan3OxLsSYr8iPuyqu0w00x_c3yFFpByzW6AGWX0GWegavea37o1d3iwuYLvTdVwexpiuhjI7vF_ehKTLI4TXRmhMMWbsd0L_0x9vveYCCSbPCTSZ-NGf--ft12hWfyLP64aeHE2tyMq24k_a8y3ZH4jJyitCy1I9a6yd2nT1VxZtawaWLoKNQk_bKEO5Wj_XitA8QTBCeKInsiy_rjOKtZnuyUgJT9NCozRKWs5eZ3WNqNImkOZ5CIWfaCW_5RFfwRnjeLn99Ey5Mvu4wZVTPw1G_K4WcpBOH4QVqxqmCViWer9lE2Iu8FfapXNLJSx7lbLDd6bt9KCJYpJC12xWc-rsta2cyV3kiLCVqLjAE1-FV3G1TcM8SgVLxMbtlWPhpNqGZECRFvplGbepgfrEW519Ny3IolM7hr1wLRfciklZGKcMDfZt4xaBiLJwS4ZP_8BaMiilWAIHHj-8hOVgG5oUHNehxZ8toTjAeqKng9BOI43Iiwp-3rLvyJPLrBjWS3FF7YPRTr5nKXSzpKhEAris2LqF6eFT_-cDksKLyKxijN2GNLm7NNXPmow2VgY=w792-h903-no?authuser=0'
        alt=''
    />
)

