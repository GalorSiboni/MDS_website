import http from "../http-common";

const getAllRestaurants = () => {
    return http.get(`/restaurants`);
};

const addRestaurant = () => {
    return http.post(`/restaurants`);
};

const updateRestaurant = (restaurant) => {
    return http.put(`/restaurants`, restaurant);
};


export default {
    getAllRestaurants,
    addRestaurant,
    updateRestaurant
};