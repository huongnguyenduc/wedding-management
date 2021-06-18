export const API_SERVER = "https://wedding-management.herokuapp.com/api/";
const FEAST_API = 'feast'
export function CallAPI(endpoint, method='GET', body)
{
    const config = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    const URL = API_SERVER + endpoint
    return fetch(URL, config)

}

export function GetFeast(success) {
    CallAPI(FEAST_API, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(data=>{
            success(data)
        })
        .catch(err=>{
            console.log(err)
        })
   
}
