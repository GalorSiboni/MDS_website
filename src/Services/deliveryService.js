import http from "../http-common";

const getAllDeliveries = () => {
    return http.get(`/deliveries`);
};

const getDelivery = (deliveryID) => {
    return http.get(`/deliveries/${deliveryID}`);
};

export default {
    getAllDeliveries,
    getDelivery
};