import axios from 'axios';
import * as Config from './../constants/Config'

export default function callApi(endpoint, method = 'GET', body = {}){
    return axios({
        method: method,
        url: `${Config.API_TEST_URL}/${endpoint}`,
        data: body,
        headers: {
        'Content-Type': 'application/json'
        }
    }).catch(error => {
        console.log(error);
        console.log(error.response);
    });
};