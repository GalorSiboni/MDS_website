import restaurantService from "../Services/restaurantService";

const allRestaurantsReducer = (state = [], action) => {

    switch (action.type) {
        case 'GET_ALL_RESTAURANTS':
            restaurantService.getAllRestaurants().then(response => {
                state = response.data;
            })
                .catch(e => {
                    console.log(e);
                });
            return state;
        case 'SET_ALL_RESTAURANTS':
            state.push(action.payload)
            return state;
        default:
            return state;
    }
};

export default allRestaurantsReducer;