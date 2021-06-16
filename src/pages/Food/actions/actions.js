export const INSERTFOOD = 'INSERTFOOD';
export const DELETEFOOD = 'DELETEFOOD';
export const UPDATEFOOD = 'UPDATEFOOD';
export const INITFOOD = 'INITFOOD';
export const INSERTFOODCATEGORY="INSERTFOODCATEGORY"
export const DELETEFOODCATEGORY = 'DELETEFOODCATEGORY'
export const UPDATEFOODCATEGORY = 'UPDATEFOODCATEGORY'
export const INITFOODCATEGORY = 'INITFOODCATEGORY'
export const ERROR = "ERROR";
export const CLOSEERROR = "CLOSEERROR";
export const INITALL = "INITALL"
export const PENDING ="PENDING"
export const DONE = "DONE"
export const SELECT ="SELECT"
export const CLOSE = "CLOSE"

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

export function actSelectFood(data)
{
    return {
        type: SELECT,
        pending:false,
        payload:data
    }
}

export function actCloseFoodDialog()
{
    return {
        type: CLOSE,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        data:null
    }
}

export function actInitFood(data) {
    return {
        type: INITFOOD,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:data
    }
}

export function actInsertFood(data) {
    return {
        type: INSERTFOOD,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Thêm thông tin món ăn thành công'
        },
        payload:data
    }
}
export function actUpdateFood(data){
    return {
        type: UPDATEFOOD,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Cập nhật thông tin món ăn thành công'
        },
        payload:data
    }
}
export function actDeleteFood(data) {
    return {
        type: DELETEFOOD,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:"Xoá thông tin món ăn thành công"
        },
        payload:data
    }
}

export function actInitFoodCategory(data) {
    return {
        type: INITFOODCATEGORY,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        payload:data
    }
}

export function actInsertFoodCategory(data) {
    return {
        type: INSERTFOODCATEGORY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Thêm thông tin món ăn thành công'
        },
        payload:data
    }
}
export function actUpdateFoodCategory(data){
    return {
        type: UPDATEFOODCATEGORY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:'Cập nhật thông tin món ăn thành công'
        },
        payload:data
    }
}
export function actDeleteFoodCategory(data) {
    return {
        type: DELETEFOODCATEGORY,
        pending:false,
        status:{
            open:true,
            severity:'success',
            message:"Xoá thông tin món ăn thành công"
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

export function actInitAll(Food, FoodCategory){
    return {
        type:INITALL,
        pending:false,
        status:{
            open:false,
            severity:'',
            message:''
        },
        lobby:Food,
        FoodCategory:FoodCategory
        
    }
}