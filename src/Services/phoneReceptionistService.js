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
    return http.get(`/phonereceptionist/routes/notApproved`);
};

const setRouteApproved = ( routeID ) => {
    return http.put(`/phonereceptionist/routes/${routeID}`);
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
    setDeliverymanRoute,
    getAllUnapprovedRoutes
};

