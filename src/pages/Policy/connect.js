import { actDeleteShift, actError, actInitFine, actInitShift, actInsertShift, actPending, actUpdateFine, actUpdateShift } from './actions/actions'
import {getCookie} from '../../action/Login'
const API_SERVER ="https://wedding-management.herokuapp.com/api/"
const POLICY_API = 'fines'
const SHIFT_API = 'shift'

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

export function GetPolicy(FinishHandle)
{
    return dispatch=>{
        dispatch(actPending())
        CallAPI(POLICY_API, "GET")
        .then((res)=>{
            if(!res.ok)
                throw new Error(res.status + '\t' + res.statusText);
            return res.json();
        })
        .then(data=>{
            dispatch(actInitFine(data))
        })
        .catch(err=>{
            dispatch(actError("Lấy thông tin Qui định không thành công"))
            })
    }
}

export function UpdatePolicy(policy, FinishHandle) 
{
    return dispatch=>{
        dispatch(actPending())
        CallAPI(POLICY_API , "PUT",policy)
        .then(res=>{
            if(!res.ok)
                throw new Error(res.status + res.statusText);
            else
                return res.json();
        })
        .then(data=>{
           dispatch(actUpdateFine(policy))
        })
        .catch(err=>{
            console.log(err)
            dispatch(actError("Cập nhật thông tin Qui định không thành công"))
        })
    }
    
}



export function GetShift(FinishHandle)
{
    return dispatch =>{
        dispatch(actPending())
        CallAPI(SHIFT_API, "GET")
        .then((res)=>{
            if(!res.ok)
                throw new Error(res.status + '\t' + res.statusText);
            return res.json();
        })
        .then(data=>{
            dispatch(actInitShift(data))
        })
        .catch(err=>{
            dispatch(actError("Lấy thông tin ca không thành công"))
        })
    }
}

export function UpdateShift(shift, FinishHandle) 
{
    return dispatch =>{
        dispatch(actPending())
        const data = {
            active: true,
            id:shift.id,
            name:shift.name,
            timeBegin:shift.timeBegin,
            timeEnd:shift.timeEnd,
        }
        CallAPI(SHIFT_API , "PUT",shift)
        .then(res=>{
            if(!res.ok)
                throw new Error(res.status + res.statusText);
            else
                return res.json();
        })
        .then(data=>{
            FinishHandle()
            dispatch(actUpdateShift(shift))
        })
        .catch(err=>{
            console.log(err)
            dispatch(actError("Cập nhật thông tin ca không thành công"))
        })
    }
}

export function InsertShift(shift, FinishHandle) 
{

    return dispatch =>{
        dispatch(actPending())
        CallAPI(SHIFT_API , "POST",shift)
        .then(res=>{
            if(!res.ok)
                throw new Error(res.status + res.statusText);
            else
                return res.json();
        })
        .then(data=>{
            FinishHandle()
            dispatch(actInsertShift(data))
        })
        .catch(err=>{
            console.log(err)
            dispatch(actError("Thêm thông tin ca không thành công"))
        })
    }
}

export function DeleteShift(shift, FinishHandle) 
{
    return dispatch =>{
        dispatch(actPending())
        CallAPI(SHIFT_API+'/'+shift.id , "DELETE")
        .then(res=>{
            if(!res.ok)
                throw new Error(res.status + res.statusText);
            else
                dispatch(actDeleteShift(shift))
        })
        .catch(err=>{
            console.log(err)
            dispatch(actError("Xoá thông tin ca không thành công"))
        })
    }
}
