import axios from "axios";

export default axios.create({
    baseURL: "http://" + process.env.REACT_APP_SERVER_HOST + ":" + process.env.REACT_APP_SERVER_PORT + "/acs",
    headers: {
        "Accept": "application/json", "Content-type": "application/json", 'Access-Control-Allow-Origin': '*'
    }

});