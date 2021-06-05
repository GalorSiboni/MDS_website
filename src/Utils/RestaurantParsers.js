import {useSelector} from "react-redux";

const RestaurantIdToRestaurantName = (restID) => {
    const allRestaurants = useSelector(state => state.allRestaurants);
    let restaurantName;
    if(restID != null || allRestaurants != null) {
        restaurantName = allRestaurants.find(restaurant => restaurant.restaurantID === restID).name;
        if (restaurantName != null)
                return "" + restaurantName
    }
    return "לא נמצא שם למסעדה";
}
export default RestaurantIdToRestaurantName

