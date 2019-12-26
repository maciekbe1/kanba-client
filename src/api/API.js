import axios from "axios";
import { isUndefined } from "lodash";

export function request(url, data) {
    if (isUndefined(data))
        return axios({
            method: "post",
            url: url,
            headers: {
                "Content-Type": "application/json"
            }
        });
    return axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json"
        },
        data: data
    });
}
export function requestToken(url, token) {
    return axios({
        method: "get",
        url: url,
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    });
}
