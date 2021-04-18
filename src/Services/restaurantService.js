import http from "../http-common";

const getAllRestaurants = () => {
    return http.get(`/restaurants`);
};

const addRestaurant = () => {
    return http.post(`/mds/restaurants`);
};

const updateRestaurant = (restaurant) => {
    return http.put(`/mds/restaurants`, restaurant);
};


export default {
    getAllRestaurants,
    addRestaurant,
    updateRestaurant
};