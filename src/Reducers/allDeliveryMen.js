import deliverymanService from "../Services/deliverymanService";

const allDeliveryMenReducer = (state = [], action) => {

    switch (action.type) {
        case 'SET_ALL_DELIVERY_MEN':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allDeliveryMenReducer;