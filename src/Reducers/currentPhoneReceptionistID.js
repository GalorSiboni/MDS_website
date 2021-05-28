const currentPhoneReceptionistIDReducer = (state = "", action) => {

    switch (action.type) {
        case 'SET_CURRENT_PHONE_RECEPTIONIST_ID':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default currentPhoneReceptionistIDReducer;