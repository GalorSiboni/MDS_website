import http from "../http-common";

const getAllDeliveryMen = () => {
    return http.get(`/deliveryman`);
};

export default {
    getAllDeliveryMen
};