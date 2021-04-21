const allRestaurantsReducer = (state = [], action) => {

    switch (action.type) {
        case 'GET_ALL_RESTAURANTS':
            return state;
        case 'SET_ALL_RESTAURANTS':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allRestaurantsReducer;