import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:" + 8081 + "/mds",
    headers: {
        "Accept": "application/json", "Content-type": "application/json", 'Access-Control-Allow-Origin': '*'
    }
});