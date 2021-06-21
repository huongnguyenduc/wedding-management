import axios from 'axios';
import * as Config from './../constants/Config'

export default function callApi(endpoint, method = 'GET', body = {}){
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInByaXZpbGVnZXMiOlsiVVBEQVRFX1VTRVIiLCJSRUFEX1VTRVIiLCJVUERBVEVfUEVSIiwiUkVBRF9TSElGVCIsIlVQREFURV9TSElGVCIsIlVQREFURV9GRUFTVCIsIlJFQURfRkVBU1QiLCJSRUFEX0ZPT0QiLCJVUERBVEVfRk9PRCIsIlJFQURfTE9CQlkiLCJVUERBVEVfTE9CQlkiLCJSRUFEX0xPQkJZQ0FURUdPUlkiLCJVUERBVEVfTE9CQllDQVRFR09SWSIsIlJFQURfU0VSVklDRSIsIlVQREFURV9TRVJWSUNFIl0sImV4cCI6MTYyNDI2Mzc1Mn0.aBV0sQB8wpOdoE1yASID2pY80P5Ztsv_DzJZoEah3v2gncdi7zNrsRHatv_C89XCkX_2Qtt1l1j9Jya6ImqcaA', 
        },
    }).catch(error => {
        console.log(error);
        console.log(error.response);
    });
};