export const INSERT = 'INSERT';
export const DELETE = 'DELETE';
export const UPDATE = 'UPDATE';
export const INIT = 'INIT';
export const ERROR = "ERROR";
export const PENDING = "PENDING"
export const DONE = "DONE"
export const CLOSEERROR = 'CLOSEERROR'

export function actPending()
{
    return {
        type: PENDING,
        Pending:true,
        status:{
            open:false
        },
        payload:null
    }
}

export function actDone()
{
    return {
        type: DONE,
        Pending:false,
        status:{
            open:false
        },
        payload:null
    }
}

export function actInitServices(data) {
    return {
        type: INIT,
        Pending:false,
        status:{
            open:false,
        },
        payload:data
    }
}

export function actInsertServices(data) {
    return {
        type: INSERT,
        Pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Thêm dịch vụ thành công'
        },
        payload:data
    }
}
export function actUpdateService(data){
    return {
        type: UPDATE,
        Pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Cập nhật dịch vụ thành công'
        },
        payload:data
    }
}
export function actDeleteService(data) {
    return {
        type: DELETE,
        Pending:false,
        status:{
            open:true,
            severity:'success',
            message:"Xoá dịch vụ thành công"
        },
        payload:data
    }
}

export function actError(message){
    return {
        type:ERROR,
        Pending:false,
        status:{
            open:true,
            severity:'error',
            message:message
        },
        payload:null
    }
}

export function actCloseError(){
    return {
        type:ERROR,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:null
    }
}