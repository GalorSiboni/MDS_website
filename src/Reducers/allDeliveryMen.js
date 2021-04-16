import deliverymanService from "../Services/deliverymanService";

const allDeliveryMenReducer = (state = [], action) => {

    switch (action.type) {
        case 'GET_ALL_DELIVERY_MEN':
            deliverymanService.getAllDeliveryMen().then(response => {
                state = response.data;
            })
                .catch(e => {
                    console.log(e);
                });
            return state;
        case 'SET_ALL_DELIVERY_MEN':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default allDeliveryMenReducer;