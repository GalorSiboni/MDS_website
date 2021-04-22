import http from "../http-common";

const getAllDeliveries = () => {
    return http.get(`/deliveries`);
};

export default {
    getAllDeliveries
};