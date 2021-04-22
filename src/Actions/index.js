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
