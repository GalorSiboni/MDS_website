const allUnapprovedRoutesReducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_ALL_UNAPPROVED_ROUTES':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allUnapprovedRoutesReducer;