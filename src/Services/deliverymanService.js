import http from "../http-common";

const getAllDeliveryMen = () => {
    return http.get(`/deliveryman`);
};

const deliverymanGetRoute = (deliverymanID, location) => {
    return http.get(`/deliveryman/route/${deliverymanID}/${location}`);
};

export default {
    getAllDeliveryMen,
    deliverymanGetRoute
};