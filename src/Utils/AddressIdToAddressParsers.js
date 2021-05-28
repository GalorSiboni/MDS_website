import {useSelector} from "react-redux";
import cityTranslator from "../Utils/CityNameTranslate";

const AddressIdToAddress = (addrId) => {
    const allAddresses = useSelector(state => state.allAddresses);
    let address;
    if(addrId != null && allAddresses != null){
        address = allAddresses.find(address => address.addressID === addrId)
        if (address != null)
            if (address.city != null)
                return "" + cityTranslator(allAddresses.find(address => address.addressID === addrId).city) + ", " + allAddresses.find(address => address.addressID === addrId).street + ", " + allAddresses.find(address => address.addressID === addrId).buildingNumber
    }
    return "כתובת לא תקינה";
}
export default AddressIdToAddress
