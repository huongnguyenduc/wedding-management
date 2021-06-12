// export const API_SERVER = "https://wedding-management.herokuapp.com/api/";
const API_SERVER ="http://localhost:4000/"
const POLICY_API = 'policy'
const SHIFT_API = 'Shift'
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
    .catch(err=>console.log(err))
}

export function UpdatePolicy(policy, FinishHandle) 
{
    CallAPI(POLICY_API +'/'+policy.name, "PUT",policy)
    .then(res=>{
        if(!res.ok)
            throw new Error(res.status + " Failed Fetch ");
        else
            return res.json();
    })
    .then(data=>{
        FinishHandle("UPDATE", data)
    })
    .catch(err=>{
        FinishHandle("ERROR", "Cập nhật không thành công")})
}

export function InsertPolicy(policy, FinishHandle)
{
    const body = policy;
    CallAPI(POLICY_API, "POST", body)
    .then(res=>{
        if(!res.ok)
            throw new Error(res.status + " Failed Fetch ");
        return res.json()
    })
    .then(data=>{
        FinishHandle("INSERT", data);
    })
    .catch(err=>FinishHandle("ERROR", "Thêm không thành công"))
}

export function DeletePolicy(policy, FinishHandle)
{
    const id = [policy.id]
    CallAPI(POLICY_API,"DELETE",id)
    .then(res=>{
        if(!res.ok)
            throw new Error( res.status + res.statusText)
        FinishHandle("DELETE", policy)
    })
    .catch( err=> FinishHandle("ERROR", "Xoá không thành công")
    )
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
        FinishHandle(data)
    })
    .catch(err=>console.log(err))
}
