export const INSERTLOBBY = 'INSERTLOBBY';
export const DELETELOBBY = 'DELETELOBBY';
export const UPDATELOBBY = 'UPDATELOBBY';
export const INITLOBBY = 'INITLOBBY';
export const INSERTLOBBYCATEGORY="INSERTLOBBYCATEGORY"
export const DELETELOBBYCATEGORY = 'DELETELOBBYCATEGORY'
export const UPDATELOBBYCATEGORY = 'UPDATELOBBYCATEGORY'
export const INITLOBBYCATEGORY = 'INITLOBBYCATEGORY'
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


export function actInitLobby(data) {
    return {
        type: INITLOBBY,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:data
    }
}

export function actInsertLobby(data) {
    return {
        type: INSERTLOBBY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Thêm thông tin sảnh thành công'
        },
        payload:data
    }
}
export function actUpdateLobby(data){
    return {
        type: UPDATELOBBY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Cập nhật thông tin sảnh thành công'
        },
        payload:data
    }
}
export function actDeleteLobby(data) {
    return {
        type: DELETELOBBY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:"Xoá thông tin sảnh thành công"
        },
        payload:data
    }
}

export function actInitLobbyCategory(data) {
    return {
        type: INITLOBBYCATEGORY,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:data
    }
}

export function actInsertLobbyCategory(data) {
    return {
        type: INSERTLOBBYCATEGORY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Thêm thông tin sảnh thành công'
        },
        payload:data
    }
}
export function actUpdateLobbyCategory(data){
    return {
        type: UPDATELOBBYCATEGORY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Cập nhật thông tin sảnh thành công'
        },
        payload:data
    }
}
export function actDeleteLobbyCategory(data) {
    return {
        type: DELETELOBBYCATEGORY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:"Xoá thông tin sảnh thành công"
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

export function actInitAll(Lobby, LobbyCategory){
    return {
        type:INITALL,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        lobby:Lobby,
        LobbyCategory:LobbyCategory
        
    }
}