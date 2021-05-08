const allPhoneReceptionistsReducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_ALL_PHONE_RECEPTIONISTS':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allPhoneReceptionistsReducer;