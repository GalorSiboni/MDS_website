import http from "../http-common";

const getAllRestaurants = () => {
    return http.get(`/restaurants`);
};

export default {
    getAllRestaurants
};