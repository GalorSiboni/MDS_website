import {useSelector} from "react-redux";

const RestaurantIdToRestaurant = (restID) => {
    const allRestaurants = useSelector(state => state.allRestaurants);
    let restaurant;
    if(restID != null || allRestaurants != null) {
        restaurant = allRestaurants.find(restaurant => restaurant.restaurantID === restID);
        if (restaurant != null)
            if (allRestaurants.find(restaurant => restaurant.restaurantID === restID).name)
                return "" + allRestaurants.find(restaurant => restaurant.restaurantID === restID).name
    }
    return "לא נמצא שם למסעדה";
}
export default RestaurantIdToRestaurant

