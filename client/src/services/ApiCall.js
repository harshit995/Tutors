// import axios from "axios";
import axios from 'axios';
axios.defaults.withCredentials = true;


export const commonrequest = async (methods, url, body, header) => {
    let config = {
        method: methods,
        url,
        headers: header ?
            header : {
                "Content-Type": "application/json",
                // withCredentials: true
            },
        data: body
    }

    //axios instance
    return axios(config).then((data) => {
        return data
    }).catch((error) => {
        return error
    })
}