export const login = () => {
    return {
        type: 'SIGN_IN'
    };
};
export const getAllDeliverymen = () => {
    return {
        type: 'GET_ALL_DELIVERY_MEN'
    };
};
export const setAllDeliverymen = (array) => {
    return {
        type: 'SET_ALL_DELIVERY_MEN',
        payload: array
    };
};
export const getAllRestaurants = () => {
    return {
        type: 'GET_ALL_RESTAURANTS',
    };
};
export const setAllRestaurants = (array) => {
    return {
        type: 'SET_ALL_RESTAURANTS',
        payload: array
    };
};
