export const admin = () => {
    return {
        type: 'ADMIN'
    };
};
export const login = () => {
    return {
        type: 'SIGN_IN'
    };
};
export const logout = () => {
    return {
        type: 'SIGN_OUT'
    };
};
export const setCurrentPhoneReceptionistID = (id) => {
    return {
        type: 'SET_CURRENT_PHONE_RECEPTIONIST_ID',
        payload: id
    };
};
export const setAllDeliverymen = (array) => {
    return {
        type: 'SET_ALL_DELIVERY_MEN',
        payload: array
    };
};
export const setAllRestaurants = (array) => {
    return {
        type: 'SET_ALL_RESTAURANTS',
        payload: array
    };
};
export const setAllDeliveries = (array) => {
    return {
        type: 'SET_ALL_DELIVERIES',
        payload: array
    };
};
export const setAllAddresses = (array) => {
    return {
        type: 'SET_ALL_ADDRESSES',
        payload: array
    };
};
export const setAllPhoneReceptionists = (array) => {
    return {
        type: 'SET_ALL_PHONE_RECEPTIONISTS',
        payload: array
    };
};
export const setAllUnapprovedRoutes = (array) => {
    return {
        type: 'SET_ALL_UNAPPROVED_ROUTES',
        payload: array
    };
};
export const setAllCities = (array) => {
    return {
        type: 'SET_ALL_CITIES',
        payload: array
    };
};
export const getShift = () => {
    return {
        type: 'GET_SHIFT',
    };
};
export const setShift = (array) => {
    return {
        type: 'SET_SHIFT',
        payload: array
    };
};
export const getRouth = () => {
    return {
        type: 'GET_ROUTH',
    };
};
export const setRouth = (array) => {
    return {
        type: 'SET_ROUTH',
        payload: array
    };
};
