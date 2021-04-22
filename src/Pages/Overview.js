import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import deliveryService from "../Services/deliveryService";
import {setAllDeliveries} from "../Actions";

const Overview = () => {
    const dispatch = useDispatch();

    deliveryService.getAllDeliveries().then(response => {
        dispatch(setAllDeliveries(response.data));
    })
        .catch(e => {
            console.log(e);
        });
    return (
        <div style={{textAlign: "center"}}>
            <Image></Image>
            <div className="grid-container">
                <div className="incidents_grid">
                    <h1 style={{textAlign:'center', textDecoration:'underline'}}>משלוחים</h1>
                    <ul>
                        {useSelector(state => state.allDeliveries).map((delivery) => {
                            return <Delivery key={delivery.deliveryID} delivery={delivery}></Delivery>
                        })}
                    </ul>
                </div>
                <div className="filters">
                    <h1 style={{textAlign:'center', textDecoration:'underline'}}>פילטרים</h1>
                </div>
            </div>
        </div>
    );
};
export default Overview;

const Delivery = (props) =>{
    const { deliveryID, deliverymanID, restaurantID, addressID, receivedTime, deliveryTime, doTime, price, restaurantCost, notes} = props.delivery;
    return (
        <tr className='delivery' key={deliveryID} style={{textAlign: 'center'}}>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"ID: " + deliveryID}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"deliverymanID: " + deliverymanID}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"restaurantID: " + restaurantID}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"addressID: " + addressID}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"receivedTime: " + receivedTime}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"deliveryTime: " + deliveryTime}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"doTime: " + doTime}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"price: " + price}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"restaurantCost: " + restaurantCost}</td>
            <td style={{paddingBottom:'2rem', paddingRight:'1rem'}}>{"notes: " + notes}</td>
        </tr>
    );
}

const Image = () => (
    <img className="logo"
         src='https://lh3.googleusercontent.com/acEcG4_q_hqOkdaUzmmtXbr4OemMx-PR_u5lUGnap5EWVg6tggLMMsxws1sBDWw35AyPOiXm726eBF0TtgmokgZj1G8TquZgTio5a90JB1ZFvjjfFzPhrzPBhcOp5OfiaQRjM-TqBmozIoHpMR8s1uLgan3OxLsSYr8iPuyqu0w00x_c3yFFpByzW6AGWX0GWegavea37o1d3iwuYLvTdVwexpiuhjI7vF_ehKTLI4TXRmhMMWbsd0L_0x9vveYCCSbPCTSZ-NGf--ft12hWfyLP64aeHE2tyMq24k_a8y3ZH4jJyitCy1I9a6yd2nT1VxZtawaWLoKNQk_bKEO5Wj_XitA8QTBCeKInsiy_rjOKtZnuyUgJT9NCozRKWs5eZ3WNqNImkOZ5CIWfaCW_5RFfwRnjeLn99Ey5Mvu4wZVTPw1G_K4WcpBOH4QVqxqmCViWer9lE2Iu8FfapXNLJSx7lbLDd6bt9KCJYpJC12xWc-rsta2cyV3kiLCVqLjAE1-FV3G1TcM8SgVLxMbtlWPhpNqGZECRFvplGbepgfrEW519Ny3IolM7hr1wLRfciklZGKcMDfZt4xaBiLJwS4ZP_8BaMiilWAIHHj-8hOVgG5oUHNehxZ8toTjAeqKng9BOI43Iiwp-3rLvyJPLrBjWS3FF7YPRTr5nKXSzpKhEAris2LqF6eFT_-cDksKLyKxijN2GNLm7NNXPmow2VgY=w792-h903-no?authuser=0'
         alt=''
    />
)