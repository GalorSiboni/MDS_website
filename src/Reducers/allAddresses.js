const allAddressesReducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_ALL_ADDRESSES':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allAddressesReducer;