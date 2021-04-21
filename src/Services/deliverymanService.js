import http from "../http-common";

const getAllDeliveryMen = () => {
    return http.get(`/deliveryman`);
};

const deliverymanGetRoute = (deliverymanID) => {
    return http.get(`/deliveryman/route/${deliverymanID}`);
};

export default {
    getAllDeliveryMen,
    deliverymanGetRoute
};