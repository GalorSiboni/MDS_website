import {useSelector} from "react-redux";

const DeliveryIdToAddressID = (deliveryID) => {
    const allDeliveries = useSelector(state => state.allDeliveries);
    let delivery;
    if(deliveryID != null && allDeliveries != null) {
        delivery = allDeliveries.find(delivery => delivery.deliveryID === deliveryID);
        if (delivery != null)
            if (allDeliveries.find(delivery => delivery.deliveryID === deliveryID))
                return allDeliveries.find(delivery => delivery.deliveryID === deliveryID).addressID
    }
    return "null";
}
export default DeliveryIdToAddressID

