import http from "../http-common";

const deleteAllPhoneReceptionists = () => {
    return http.delete(`/mds/admin/phonereceptionist`);
};

const deletePhoneReceptionist = (phoneReceptionistID) => {
    return http.delete(`/mds/phonereceptionist/${phoneReceptionistID}`);
};

const addPhoneReceptionist = (username, password, phoneReceptionist) => {
    return http.post(`/mds/phonereceptionist`,(username, password, phoneReceptionist));
};

const getAllPhoneReceptionists = () => {
    return http.get(`/mds/phonereceptionist`);
};

const getPhoneReceptionists = (phoneReceptionistID) => {
    return http.get(`/mds/phonereceptionist/${phoneReceptionistID}`);
};

const updatePhoneReceptionist = (phoneReceptionist) => {
    return http.put(`/mds/phonereceptionist`,phoneReceptionist);
};

export default {
    deleteAllPhoneReceptionists,
    deletePhoneReceptionist,
    addPhoneReceptionist,
    getAllPhoneReceptionists,
    getPhoneReceptionists,
    updatePhoneReceptionist
};

