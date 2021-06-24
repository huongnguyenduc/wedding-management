import {getCookie} from '../../action/Login'
export const API_SERVER = "https://wedding-management.herokuapp.com/api/";
const REPORT_API = 'report'

export function CallAPI(endpoint, method='GET', body)
{
    const token = getCookie("token")
    const config = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    const URL = API_SERVER + endpoint
    return fetch(URL, config)

}

export function GetReport(month, year, returnData,success, error) {
    CallAPI(REPORT_API+`/month/${month}/year/${year}`, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(res=>{
            returnData(res)
            success()
        })
        .catch(err=>{
            error(err)
        })
}

export function GetLobbyReport(month, year,returnData, success, error) {
    CallAPI(REPORT_API+`/lobby/month/${month}/year/${year}`, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(res=>{
            returnData(res)
            success()
        })
        .catch(err=>{
            error(err)
            console.log(err)
        })
}

export function GetServiceReport(month, year,returnData, success, error) {
    CallAPI(REPORT_API+`/service/month/${month}/year/${year}`, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(res=>{
            returnData(res)
            success()
        })
        .catch(err=>{
            error(err)
        })
}

export function GetFoodReport(month, year,returnData, success, error) {
    CallAPI(REPORT_API+`/food/month/${month}/year/${year}`, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(res=>{
            returnData(res)
            success()
        })
        .catch(err=>{
            error(err)
        })
}