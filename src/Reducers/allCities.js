const allCitiesReducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_ALL_CITIES':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allCitiesReducer;