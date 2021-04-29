import http from "../http-common";

const getAllRestaurants = () => {
    return http.get(`/restaurants`);
};

const addRestaurant = (username, password, restaurant) => {
    return http.post(`/restaurants`,(username, password, restaurant));
};

const updateRestaurant = (restaurant) => {
    return http.put(`/restaurants`, restaurant);
}

const getAllCities = () => {
    return http.get(`/restaurants/cities`);
};

const getAllDeliveries = (restaurantID) => {
    return http.get(`/restaurants/delivery/${restaurantID}`);
};

export default {
    getAllRestaurants,
    addRestaurant,
    updateRestaurant,
    getAllCities,
    getAllDeliveries
};