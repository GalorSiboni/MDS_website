import React, {useContext, useState} from 'react';
import {DetailsContext} from '../Contexts/DetailsContext'


const DeliveryMan_Management = () => {
    const [isClicked, setIsClicked] = useState(true);
    return(
    <div>
        <DetailsContext.Provider valie={{isClicked, setIsClicked}}>
            {isClicked ? <Delivery_man_name_list/> : <Delivery_man_details/>}
        </DetailsContext.Provider>
    </div>
    );
};
export default DeliveryMan_Management;

const Delivery_man_name_list = () => {
    const setClicked = useContext(DetailsContext)
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
                <DetailsContext.Provider value={{setClicked}}>

                <div>
                    <section className='delivery_man_list'>
                        {delivery_man_array.map((delivery_man) => {
                            return <Delivery_man key={delivery_man.deliverymanID} delivery_man={delivery_man}></Delivery_man>
                        })}
                    </section>
                </div>
                </DetailsContext.Provider>
            </div>
    );
}

const Delivery_man_details = () =>  {
    return(
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center"}}>
                <Image/>
            </div>
            <h1 style={{
                margin: 'auto',
                textAlign: 'right',
                color: '#052342',
                paddingRight: '10rem',
                fontSize: 40
            }}>:דף שליח</h1>
            <Delivery_man_full delivery_man={delivery_man_array[0]}/>
        </div>
    )
}


const Delivery_man = (props) =>{
    const { name } = props.delivery_man;
    const setClicked = useContext(DetailsContext)

    return (
        <article className='delivery_man'>
            <h2 onClick={() => setClicked(true)} style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{name}</h2>
        </article>
    );
}
const Delivery_man_full = (props) =>{
    const { deliverymanID, name, phoneNumber, location, currentShift, route, isDeleted} = props.delivery_man;

    return (

        <article className='delivery_man'>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem'} }>{"DeliverymanID:" + deliverymanID}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem'} }>{"Name:" + name}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem'} }>{"PhoneNumber:" + phoneNumber}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem'} }>{"Location:" + location}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem'} }>{"CurrentShift:"}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '4rem'} }>{"Worker ID:" + currentShift.workerID}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '4rem'} }>{"Shift Start:" + currentShift.shiftStart}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '4rem'} }>{"isConfirmed:" + currentShift.isConfirmed}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem'} }>{"Route:"}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '4rem'} }>{"Deliveries:"}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '10rem'} }>{"0:" + route.deliveries[0]}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '10rem'} }>{"1:" + route.deliveries[1]}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '10rem'} }>{"2:" + route.deliveries[2]}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '10rem'} }>{"3:" + route.deliveries[3]}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem', paddingLeft: '4rem'} }>{"isApproved:" +  route.isApproved}</h2>
            <h2 style={{margin: 'auto', textAlign: 'left', paddingBottom:'2rem'} }>{"isDeleted:" + isDeleted}</h2>
        </article>
    );
}

const delivery_man_array = [
    {
        deliverymanID: 'MXBkWizNBCQYUpxLfEdmy2kxAov2',
        name: 'Galor Siboni',
        phoneNumber: '0500000000',
        location: '0.40, 0.40',
        currentShift: {
            workerID: 'MXBkWizNBCQYUpxLfEdmy2kxAov2',
            shiftStart: '2021-01-16T10:55:52.000+00:00',
            isConfirmed: false
        },
        route: {
            deliverymanID: 'MXBkWizNBCQYUpxLfEdmy2kxAov2',
            deliveries: {
                0: '6002e1070be7935aa3080f21',
                1: '6002e6530be7935aa3080f23',
                2: '6002e6530be7935aa3080f23',
                3: '6002e1070be7935aa3080f21'
            },
            isApproved: false
        },
        isDeleted: false
    },
    {
        deliverymanID: 'MXBkWizNBCQYUpxLfEdmy2kxCss5',
        name: 'Yossi Cohen',
        phoneNumber: '0500000001',
        location: '0.50, 0.50',
        currentShift: {
            workerID: 'MXBkWizNBCQYUpxLfEdmy2kxCss5',
            shiftStart: '2021-01-16T10:55:52.000+00:00',
            isConfirmed: false
        },
        route: {
            deliverymanID: 'MXBkWizNBCQYUpxLfEdmy2kxCss5',
            deliveries: {
                0: '6002e1070be7935aa3080f21',
                1: '6002e6530be7935aa3080f23',
                2: '6002e6530be7935aa3080f23',
                3: '6002e1070be7935aa3080f21'
            },
            isApproved: false
        },
        isDeleted: false
    }
]

const Image = () => (
    <img className="logo"
        src='https://lh3.googleusercontent.com/acEcG4_q_hqOkdaUzmmtXbr4OemMx-PR_u5lUGnap5EWVg6tggLMMsxws1sBDWw35AyPOiXm726eBF0TtgmokgZj1G8TquZgTio5a90JB1ZFvjjfFzPhrzPBhcOp5OfiaQRjM-TqBmozIoHpMR8s1uLgan3OxLsSYr8iPuyqu0w00x_c3yFFpByzW6AGWX0GWegavea37o1d3iwuYLvTdVwexpiuhjI7vF_ehKTLI4TXRmhMMWbsd0L_0x9vveYCCSbPCTSZ-NGf--ft12hWfyLP64aeHE2tyMq24k_a8y3ZH4jJyitCy1I9a6yd2nT1VxZtawaWLoKNQk_bKEO5Wj_XitA8QTBCeKInsiy_rjOKtZnuyUgJT9NCozRKWs5eZ3WNqNImkOZ5CIWfaCW_5RFfwRnjeLn99Ey5Mvu4wZVTPw1G_K4WcpBOH4QVqxqmCViWer9lE2Iu8FfapXNLJSx7lbLDd6bt9KCJYpJC12xWc-rsta2cyV3kiLCVqLjAE1-FV3G1TcM8SgVLxMbtlWPhpNqGZECRFvplGbepgfrEW519Ny3IolM7hr1wLRfciklZGKcMDfZt4xaBiLJwS4ZP_8BaMiilWAIHHj-8hOVgG5oUHNehxZ8toTjAeqKng9BOI43Iiwp-3rLvyJPLrBjWS3FF7YPRTr5nKXSzpKhEAris2LqF6eFT_-cDksKLyKxijN2GNLm7NNXPmow2VgY=w792-h903-no?authuser=0'
        alt=''
    />
)
