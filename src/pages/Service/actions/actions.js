export const INSERT = 'INSERT';
export const DELETE = 'DELETE';
export const UPDATE = 'UPDATE';
export const INIT = 'INIT';
export const ERROR = "ERROR";

export function actInitServices(data) {
    return {
        type: INIT,
        status:{
            severity:'',
            message:''
        },
        payload:data
    }
}

export function actInsertServices(data) {
    return {
        type: INSERT,
        status:{
            severity:'success',
            message:'Thêm dịch vụ thành công'
        },
        payload:data
    }
}
export function actUpdateService(data){
    return {
        type: UPDATE,
        status:{
            severity:'success',
            message:'Cập nhật dịch vụ thành công'
        },
        payload:data
    }
}
export function actDeleteService(data) {
    return {
        type: DELETE,
        status:{
            severity:'success',
            message:"Xoá dịch vụ thành công"
        },
        payload:data
    }
}

export function actError(message){
    return {
        type:ERROR,
        status:{
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
            severity:'',
            message:''
        },
        payload:null
    }
}