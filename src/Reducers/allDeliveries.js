const allDeliveriesReducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_ALL_DELIVERIES':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allDeliveriesReducer;