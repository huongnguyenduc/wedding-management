import axios from 'axios';
import * as Config from './../constants/Config'
import {getCookie} from '../action/Login'
export default function callApi(endpoint, method = 'GET', body = {}){
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie("token"), 
        },
    }).catch(error => {
        console.log(error);
        console.log(error.response);
    });
};