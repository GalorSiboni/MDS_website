import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setAllRestaurants} from "../Actions";
import restaurantService from "../Services/restaurantService";


const Restaurants_Management = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [currentRestaurant, setCurrentRestaurant] = useState();
    const dispatch = useDispatch();

    restaurantService.getAllRestaurants().then(response => {
        dispatch(setAllRestaurants(response.data));
    })
        .catch(e => {
            console.log(e);
        });
    return(
        <div>
            {isClicked ? <Restaurants_details myVar={setIsClicked} current={currentRestaurant}/> : <Restaurants_name_list myVar={setIsClicked} current={setCurrentRestaurant}/> }
        </div>
    );
};

export default Restaurants_Management;

const Restaurants_name_list = (props) => {
    const setClicked = props.myVar
    const setCurrentRestaurant = props.current

    return(
        <div className='restaurant_management' style={{alignItems: "center"}}>
            <div style={{textAlign: "center"}}>
                <img className="logo"
                     src={process.env.PUBLIC_URL + '/app_icon.png'}
                />
            </div>
            <h1 style={{
                margin: 'auto',
                textAlign: 'right',
                color: '#052342',
                paddingRight: '10rem',
                fontSize: 40
            }}>:מסעדות</h1>
            <div>
                <section className='restaurants'>
                    {useSelector(state => state.allRestaurants).map((restaurant) => {
                        return <Restaurant key={restaurant.restaurantID} restaurant={restaurant} myVar={setClicked} current={setCurrentRestaurant}></Restaurant>
                    })}
                </section>
            </div>
        </div>
    );
}

const Restaurants_details = (props) =>  {
    const currentRestaurant = props.current
    const setClicked = props.myVar
    return(
        <div style={{textAlign: "center"}}>
            <div style={{textAlign: "center"}}>
                <img className="logo"
                     src={process.env.PUBLIC_URL + '/app_icon.png'}
                />
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
            <Restaurant_full restaurant={useSelector(state => state.allRestaurants).find(x => x.restaurantID === currentRestaurant)}/>
        </div>
    )
}

const Restaurant = (props) =>{
    const { name , restaurantID} = props.restaurant;
    return (
        <article className='restaurant'>
            <h2 onClick={() => {props.myVar(true) ; props.current(restaurantID)}} style={{margin: 'auto', textAlign: 'Center', paddingBottom:'2rem'} }>{name}</h2>
        </article>
    );
}

const Restaurant_full = (props) =>{
    const { restaurantID, name, phoneNumber, location, deliveries, deleted} = props.restaurant;

    if (deliveries == null){
        return (
            <article className='restaurant'>
                <ul  style={{paddingRight: '25rem'}} dir="RTL">
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } dir="RTL">{"מזהה מסעדה: " + restaurantID}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"שם המסעדה: " + name}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מס' טלפון: " + phoneNumber}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מיקום: " + location}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"משלוחים: אין משלוחים חדשים"}</li>
                    <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{(deleted == (false || undefined)) ? "סטטוס מסעדה: לא פעילה" : "סטטוס מסעדה: פעילה"}</li>
                </ul>
            </article>
        );
    }

    return (
        <article className='restaurant'>
            <ul  style={{position: 'absolute', right: '40%'}} dir="RTL">
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem', paddingTop: '2rem'} } dir="RTL">{"מזהה מסעדה: " + restaurantID}</li>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"שם המסעדה: " + name}</li>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מס' טלפון: " + phoneNumber}</li>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"מיקום: " + location}</li>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{"משלוחים: "}</li>
                <ul style={{paddingRight: '2rem'}} dir="RTL">
                    {deliveries.map(i => { return <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'}} dir="RTL">{i}</li> })}
                </ul>
                <li style={{margin: 'auto', textAlign: 'right', paddingBottom:'2rem'} } dir="RTL">{(deleted == (false || undefined)) ? "סטטוס מסעדה: לא פעילה" : "סטטוס מסעדה: פעילה"}</li>
            </ul>
        </article>
    );
}

