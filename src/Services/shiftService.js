import http from "../http-common";

const deleteAllShifts = () => {
    return http.delete(`/admin/shift`);
};

const deleteShift = (shiftID) => {
    return http.delete(`/shift/${shiftID}`);
};

const getAllShifts = (page, size) => {
    return http.get(`/shift`, (page, size));
};

const getShift = async (shiftID) => {
    return await http.get(`/shift/${shiftID}`);
};

const updateShift = (shift) => {
    return http.put(`/shift`, shift);
};

const searchBy = (search, value, minValue, maxValue, page, size) => {
    return http.get(`/shift/find/by`, (search, value, minValue, maxValue, page, size));
};

export default {
    deleteAllShifts,
    deleteShift,
    getShift,
    updateShift,
    getAllShifts,
    searchBy
};