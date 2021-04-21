import http from "../http-common";

const deleteAllPhoneReceptionists = () => {
    return http.delete(`/admin/phonereceptionist`);
};

const deletePhoneReceptionist = (phoneReceptionistID) => {
    return http.delete(`/phonereceptionist/${phoneReceptionistID}`);
};

const addPhoneReceptionist = (username, password, phoneReceptionist) => {
    return http.post(`/phonereceptionist`,(username, password, phoneReceptionist));
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

export default {
    deleteAllPhoneReceptionists,
    deletePhoneReceptionist,
    addPhoneReceptionist,
    getAllPhoneReceptionists,
    getPhoneReceptionists,
    updatePhoneReceptionist
};

