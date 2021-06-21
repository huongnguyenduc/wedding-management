import axios from 'axios';
import * as Config from './../constants/Config'

export default function callApi(endpoint, method = 'GET', body = {}){
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInByaXZpbGVnZXMiOlsiVVBEQVRFX1VTRVIiLCJSRUFEX1VTRVIiLCJVUERBVEVfUEVSIiwiUkVBRF9TSElGVCIsIlVQREFURV9TSElGVCIsIlVQREFURV9GRUFTVCIsIlJFQURfRk9PRCIsIlVQREFURV9GT09EIiwiUkVBRF9MT0JCWSIsIlVQREFURV9MT0JCWSIsIlJFQURfTE9CQllDQVRFR09SWSIsIlVQREFURV9MT0JCWUNBVEVHT1JZIiwiUkVBRF9TRVJWSUNFIiwiVVBEQVRFX1NFUlZJQ0UiLCJSRUFEX0ZFQVNUIl0sImV4cCI6MTYyNDI0MTg5OH0.ADcYERjlVkSap0S9ylknICSyp1Kelysz6yKS3WY4m7m1tnLSJMsrqfd4oBj5TPq_V5IBi2diXNaKE1NjaNcXcA', 
        },
    }).catch(error => {
        console.log(error);
        console.log(error.response);
    });
};