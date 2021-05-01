import http from "../http-common";

const deleteAllRestaurants = () => {
    return http.delete(`/restaurants`);
};

const deleteRestaurant = (restaurantID) => {
    return http.delete(`/restaurants/${restaurantID}`);
};

const getAllRestaurants = () => {
    return http.get(`/restaurants`);
};

const getRestaurant = (restaurantID) => {
    return http.get(`/restaurants/${restaurantID}`);
};

const addRestaurant = (restaurant) => {
    return http.post(`/restaurants`,(restaurant));
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

const updateDelivery = (restaurantID) => {
    return http.put(`/restaurants/delivery/${restaurantID}`);
}


export default {
    getAllRestaurants,
    addRestaurant,
    updateRestaurant,
    updateDelivery,
    getAllCities,
    getAllDeliveries,
    deleteAllRestaurants,
    deleteRestaurant,
    getRestaurant
};