const API_SERVER ="https://wedding-management.herokuapp.com/api/"
const POLICY_API = 'fines'
const SHIFT_API = 'shift'
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

export function GetPolicy(FinishHandle)
{
    CallAPI(POLICY_API, "GET")
    .then((res)=>{
        if(!res.ok)
            throw new Error(res.status + '\t' + res.statusText);
        return res.json();
    })
    .then(data=>{
        FinishHandle("INIT", data)
    })
    .catch(err=>{
        FinishHandle("ERROR", "Lấy thông tin qui định không thành công")})
}

export function UpdatePolicy(policy, FinishHandle) 
{
    CallAPI(POLICY_API , "PUT",policy)
    .then(res=>{
        if(!res.ok)
            throw new Error(res.status + res.statusText);
        else
            return res.json();
    })
    .then(data=>{
        FinishHandle("UPDATE", data)
    })
    .catch(err=>{
        console.log(err)
        FinishHandle("ERROR", "Cập nhật thông tin qui định không thành công")})
}



export function GetShift(FinishHandle)
{
    CallAPI(SHIFT_API, "GET")
    .then((res)=>{
        if(!res.ok)
            throw new Error(res.status + '\t' + res.statusText);
        return res.json();
    })
    .then(data=>{
        FinishHandle("INIT",data)
    })
    .catch(err=>{
        FinishHandle("ERROR", "Lấy thông tin ca không thành công")
    })
}
