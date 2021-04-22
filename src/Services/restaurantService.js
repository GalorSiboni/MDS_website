import http from "../http-common";

const getAllRestaurants = () => {
    return http.get(`/restaurants`);
};

const addRestaurant = (restaurant) => {
    return http.post(`/restaurants`, restaurant);
};

const updateRestaurant = (restaurant) => {
    return http.put(`/restaurants`, restaurant);
};


export default {
    getAllRestaurants,
    addRestaurant,
    updateRestaurant
};