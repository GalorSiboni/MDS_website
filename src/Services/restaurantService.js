import http from "../http-common";

const deleteAllRestaurants = () => {
    return http.delete(`/restaurants`);
};

const deleteRestaurant = (restaurantID) => {
    return http.delete(`/restaurants/${restaurantID}`);
};

const getAllRestaurants = (page, size) => {
    return http.get(`/restaurants`, (page, size));
};

const getRestaurant = (restaurantID) => {
    return http.get(`/restaurants/${restaurantID}`);
};

const addRestaurant = (restaurant) => {
    return http.post(`/restaurants`,(restaurant));
};

const updateRestaurant = (restaurant) => {
    return http.put(`/restaurants`, restaurant);
};


const addDelivery = (restaurantID, delivery) => {
    return http.post(`/restaurants/delivery/${restaurantID}`, delivery);
};

const updateDelivery = (restaurantID) => {
    return http.put(`/restaurants/delivery/${restaurantID}`);
};


const getDeliveryList = (restaurantID, page, size) => {
    return http.get(`/restaurants/delivery/${restaurantID}`, (page, size));
}

export default {
    getAllRestaurants,
    addRestaurant,
    updateRestaurant,
    updateDelivery,
    getDeliveryList,
    addDelivery,
    deleteAllRestaurants,
    deleteRestaurant,
    getRestaurant
};