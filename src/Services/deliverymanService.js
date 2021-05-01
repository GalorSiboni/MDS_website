import http from "../http-common";

const getAllDeliveryMen = () => {
    return http.get(`/deliveryman`);
};

const getAllWorkingDeliverymen = () => {
    return http.get(`/deliveryman/working`);
};

const deliverymanGetRoute = (deliverymanID, location) => {
    return http.get(`/deliveryman/route/${deliverymanID}/${location}`);
};

const addDeliveryMen = (deliveryMen) => {
    return http.post(`/deliveryman`, deliveryMen);
};

const updateDeliveryman = (deliveryman) => {
    return http.put(`/deliveryman`,deliveryman);
};

const getDeliveryman = (deliverymanID) => {
    return http.post(`/deliveryman/${deliverymanID}`);
};

const deleteDeliveryman = (deliverymanID) => {
    return http.post(`/deliveryman/${deliverymanID}`);
};

const deleteAllDeliverymen = () => {
    return http.delete(`/deliveryman`);
};

export default {
    getAllDeliveryMen,
    deliverymanGetRoute,
    deleteAllDeliverymen,
    deleteDeliveryman,
    addDeliveryMen,
    getAllWorkingDeliverymen,
    getDeliveryman,
    updateDeliveryman
};