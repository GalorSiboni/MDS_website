import {useSelector} from "react-redux";

const DeliverymanIdToDeliverymanName = (deliverymanID) => {
    const allDeliveryMen = useSelector(state => state.allDeliveryMen);
    if(deliverymanID !== null && allDeliveryMen !== null) {
            return allDeliveryMen.find(deliveryman => deliveryman.deliverymanID === deliverymanID).name
    }
    return "לא הוקצה שליח";
}
export default DeliverymanIdToDeliverymanName

