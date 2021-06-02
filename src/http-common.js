import axios from "axios";
import {getToken} from "./Utils/Common"

export default axios.create({
    baseURL: "http://localhost:" + 8081 + "/mds",
    headers: {
        "Accept": "application/json", "Content-type": "application/json", 'Access-Control-Allow-Origin': '*',
        common:{'Authorization': 'Bearer' + getToken()}
    }
});