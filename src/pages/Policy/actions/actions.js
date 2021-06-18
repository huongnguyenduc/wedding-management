export const INSERTSHIFT = 'INSERTSHIFT';
export const DELETESHIFT = 'DELETESHIFT';
export const UPDATESHIFT = 'UPDATESHIFT';
export const INITSHIFT = 'INITSHIFT';
export const INSERTFINE="INSERTFINE"
export const DELETEFINE = 'DELETEFINE'
export const UPDATEFINE = 'UPDATEFINE'
export const INITFINE = 'INITFINE'
export const ERROR = "ERROR";
export const CLOSEERROR = "CLOSEERROR";
export const INITALL = "INITALL"
export const PENDING ="PENDING"
export const DONE = "DONE"

export function actPending(){
    return {
        type: PENDING,
        pending:true,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:null
    }
}

export function actDone(){
    return {
        type: DONE,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:null
    }
}


export function actInitShift(data) {
    return {
        type: INITSHIFT,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:data
    }
}

export function actInsertShift(data) {
    return {
        type: INSERTSHIFT,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Thêm thông tin sảnh thành công'
        },
        payload:data
    }
}
export function actUpdateShift(data){
    return {
        type: UPDATESHIFT,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Cập nhật thông tin sảnh thành công'
        },
        payload:data
    }
}
export function actDeleteShift(data) {
    return {
        type: DELETESHIFT,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:"Xoá thông tin sảnh thành công"
        },
        payload:data
    }
}

export function actInitFine(data) {
    return {
        type: INITFINE,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:data[0]
    }
}

export function actUpdateFine(data){
    return {
        type: UPDATEFINE,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Cập nhật thông tin sảnh thành công'
        },
        payload:data
    }
}


export function actError(message){
    return {
        type:ERROR,
        pending:false,
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
        type:CLOSEERROR,
        pending:false,
        status:{
            open:false,
        },
        payload:null
    }
}

export function actInitAll(Shift, Fine){
    return {
        type:INITALL,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        lobby:Shift,
        Fine:Fine
        
    }
}