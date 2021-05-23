import React from "react";
import {useSelector} from "react-redux";

const RestaurantIdToRestaurant = (restID) => {
    const allRestaurants = useSelector(state => state.allRestaurants);
    if(restID != null || allRestaurants != null)
        if (allRestaurants.find(restaurant => restaurant.restaurantID == restID).name)
            return "" + allRestaurants.find(restaurant => restaurant.restaurantID == restID).name
    return "לא נמצא שם למסעדה";
}
export default RestaurantIdToRestaurant

