const allRestaurantsReducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_ALL_RESTAURANTS':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allRestaurantsReducer;