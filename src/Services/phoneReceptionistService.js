import http from "../http-common";

const deleteAllPhoneReceptionists = () => {
    return http.delete(`/admin/phonereceptionist`);
};

const deletePhoneReceptionist = (phoneReceptionistID) => {
    return http.delete(`/phonereceptionist/${phoneReceptionistID}`);
};

const setDeliverymanRoute = (deliverymanID, deliveries) => {
    return http.post(`/phonereceptionist/route/${deliverymanID}`, deliveries);
};

const addPhoneReceptionist = (username, password, phoneReceptionist) => {
    return http.post(`/phonereceptionist`,(username, password, phoneReceptionist));
};

const getAllUnapprovedRoutes = () => {
    return http.get(`/phonereceptionist/route/notApproved`);
};

const apporoveDeliverymanRoute = ( routeID ) => {
    return http.put(`/phonereceptionist/route/${routeID}`);
};

const getAllPhoneReceptionists = () => {
    return http.get(`/phonereceptionist`);
};

const getPhoneReceptionists = (phoneReceptionistID) => {
    return http.get(`/phonereceptionist/${phoneReceptionistID}`);
};

const updatePhoneReceptionist = (phoneReceptionist) => {
    return http.put(`/phonereceptionist`,phoneReceptionist);
};

const phoneReceptionistLogin = ( phoneReceptionistID ) => {
    return http.post(`/phonereceptionist/login/${phoneReceptionistID}`);
};

const phoneReceptionistLogout = ( phoneReceptionistID ) => {
    return http.post(`/phonereceptionist/logout/${phoneReceptionistID}`);
};

export default {
    deleteAllPhoneReceptionists,
    deletePhoneReceptionist,
    addPhoneReceptionist,
    getAllPhoneReceptionists,
    getPhoneReceptionists,
    updatePhoneReceptionist,
    phoneReceptionistLogin,
    phoneReceptionistLogout,
    apporoveDeliverymanRoute,
    getAllUnapprovedRoutes
};

