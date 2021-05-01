import http from "../http-common";

const deleteAllAddresses = () => {
    return http.delete(`/address`);
};

const deleteAddress = (addressID) => {
    return http.delete(`/address/${addressID}`);
};

const getAllCities = () => {
    return http.get(`/address`);
};

const getAllAddresses = (page, size) => {
    return http.get(`/address`, (page, size));
};

const getAddress = (addressID) => {
    return http.get(`/address/${addressID}`);
};

const updateAddress = (address) => {
    return http.put(`/mds/address`, address);
};

const addAddress = (address) => {
    return http.post(`/mds/address`, address);
};

export default {
    deleteAllAddresses,
    deleteAddress,
    getAddress,
    getAllAddresses,
    updateAddress,
    addAddress,
    getAllCities
};