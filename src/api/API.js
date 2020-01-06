import axios from "axios";
import { isNil } from "lodash";

export function request(url, data, token, method = "post") {
    if (isNil(data) && isNil(token))
        return axios({
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json"
            }
        });
    if (!isNil(token))
        return axios({
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            data: data
        });
    return axios({
        method: method,
        url: url,
        headers: {
            "Content-Type": "application/json"
        },
        data: data
    });
}
export function requestToken(url, token, data = null) {
    if (isNil(data))
        return axios({
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        });
}
