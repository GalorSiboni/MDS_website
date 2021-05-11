import http from "../http-common";

const getAllDeliveries = () => {
    return http.get(`/deliveries`);
};

const getDelivery = (deliveryID) => {
    return http.get(`/deliveries/${deliveryID}`);
};
const updateDelivery = (delivery) => {
    return http.put(`/deliveries`, delivery);
};

const deleteAllDeliveries = () => {
    return http.delete(`/deliveries`);
};

const deleteDelivery = (deliveryID) => {
    return http.delete(`/deliveries/${deliveryID}`);
};

const addDelivery = (delivery) => {
    return http.post(`/deliveries`,delivery);
};


const searchBy = (search, value, minValue, maxValue, page, size) => {
    return http.get(`/deliveries/find/by`,(search, value, minValue, maxValue, page, size));
};

export default {
    getAllDeliveries,
    getDelivery,
    deleteAllDeliveries,
    deleteDelivery,
    updateDelivery,
    searchBy,
    addDelivery
};