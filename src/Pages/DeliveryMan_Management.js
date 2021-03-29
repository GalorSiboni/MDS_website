import React,{useState} from 'react';

const DeliveryMan_Management = () => {
    const [isClicked, setIsClicked] = useState(false);
    if (isClicked) {
        return (
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
                    <Delivery_man_list/>
                </div>
            </div>
        );
    }
    else {
        return (
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
                <Delivery_man_full delivery_man={delivery_mans[1]}/>
            </div>
        )
    }
};
export default DeliveryMan_Management;
function Delivery_man_list(){
    return (
        <section className='delivery_man_list'>
            {delivery_mans.map((delivery_man) => {
                return <Delivery_man delivery_man={delivery_man}></Delivery_man>
            })}
        </section>
    );
}
const Delivery_man = (props) =>{
    const { name } = props.delivery_man;

    return (
        <article className='delivery_man'>
            <h2 style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{name}</h2>
        </article>
    );
}
const Delivery_man_full = (props) =>{
    const { deliverymanID, name, phoneNumber, location, currentShift, route, isDeleted} = props.delivery_man;

    return (

        <article className='delivery_man'>
            <h2 style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{deliverymanID}</h2>
            <h2 style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{name}</h2>
            <h2 style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{phoneNumber}</h2>
            <h2 style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{location}</h2>
            <h2 style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{currentShift}</h2>
            <h2 style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{route}</h2>
            <h2 style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{isDeleted}</h2>
        </article>
    );
}

const delivery_mans = [
    {
        deliverymanID: 'MXBkWizNBCQYUpxLfEdmy2kxAov2',
        name: 'Galor Siboni',
        phoneNumber: '0524658614',
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
        deliverymanID: '2',
        name: 'יוסי',
        phoneNumber: '0524658614',
        location: 'zerufa',
        currentShift: 'xxx',
        route: 'zerufa, Haifa',
        isDeleted: false
    }
]

    const Image = () => (
        <img
            src='https://resizeimage.net/mypic/VX2m37Mh0XSNU5Gw/L7F5W/app_icon.png'
            alt=''
        />
    )