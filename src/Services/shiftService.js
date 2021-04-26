import http from "../http-common";

const deleteAllShifts = () => {
    return http.delete(`/admin/shift`);
};

const deleteShift = (shiftID) => {
    return http.delete(`/shift/${shiftID}`);
};

const getShift = (shiftID) => {
    return http.get(`/shift/${shiftID}/${null}/${null}`);
};

const updateShift = (shiftID) => {
    return http.put(`/shift/${shiftID}`);
};


export default {
    deleteAllShifts,
    deleteShift,
    getShift,
    updateShift
};