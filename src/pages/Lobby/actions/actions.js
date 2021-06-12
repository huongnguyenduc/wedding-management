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

export function actInitLobby(data) {
    return {
        type: INITLOBBY,
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
        status:null,
        payload:null
    }
}

export function actInitAll(Lobby, LobbyCategory){
    return {
        type:INITALL,
        status:{
            open:false,
            severity:'',
            message:''
        },
        lobby:Lobby,
        LobbyCategory:LobbyCategory
        
    }
}