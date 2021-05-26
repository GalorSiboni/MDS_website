import {useSelector} from "react-redux";

const AddressIdToAddress = (addrId) => {
    const allAddresses = useSelector(state => state.allAddresses);
    let address;
    if(addrId != null && allAddresses != null){
        address = allAddresses.find(address => address.addressID === addrId)
        if (address != null)
            if (address.city != null)
                return "" + cityTranslate(allAddresses.find(address => address.addressID === addrId).city) + ", " + allAddresses.find(address => address.addressID === addrId).street + ", " + allAddresses.find(address => address.addressID === addrId).buildingNumber
    }
    return "כתובת לא תקינה";
}
export default AddressIdToAddress

function cityTranslate(city) {
    let translate = "";
    switch (city){
        case "ROSH_AAYIN":
            translate = "ראש העין";
            break;
        case "ORANIT":
            translate = "אורנית";
            break;
        case "SHAAREI_TIKVA":
            translate = "שערי תקווה";
            break;
        case "ELKANA":
            translate = "אלקנה";
            break;
        case "ETZ_EFRAIM":
            translate = "עץ אפריים";
            break;
        case "HAGOR":
            translate = "חגור";
            break;
        case "MATAN":
            translate = "מתן";
            break;
        case "NIRIT":
            translate = "נירית";
            break;
        case "YARHIV":
            translate = "ירחיב";
            break;
        case "SHOHAM":
            translate = "שהם";
            break;
        case "GIVAT_HASHLOSHA":
            translate = "גבעת השלושה";
            break;
        case "NAHSHONIM_BASE":
            translate = "בסיס נחשונים";
            break;
        case "KFAR_SABA":
            translate = "כפר סבא";
            break;
        case "TEL_AVIV":
            translate = "תל-אביב";
            break;
        case "KFAR_KASEM":
            translate = "כפר קאסם";
            break;
        case "OTHER":
            translate = "אחר";
            break;
        case "NAHSHONIM":
            translate = "נחשונים";
            break;
        case "PETAH_TIKVA":
            translate = "פתח תקווה";
            break;
        case "EINAT":
            translate = "עינת";
            break;
        default:
    }
    return translate;
}

