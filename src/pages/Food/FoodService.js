import {actPending ,actError, actInitFood, actDeleteFood , actInsertFood, actUpdateFood, actInitFoodCategory, actDeleteFoodCategory, actUpdateFoodCategory, actInsertFoodCategory} from './actions/actions'
import {getCookie} from '../../action/Login'
const API_SERVER = "https://wedding-management.herokuapp.com/api/";
const FOOD_API = "food";
const FOOD_CATEGORY_API = "food-category"

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

export function GetFood() {
    return dispatch =>
    {   
        dispatch(actPending())
        CallAPI(FOOD_API, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(data=>{
            dispatch(actInitFood(data))})
        .catch(err=>{
            console.log(err)
            dispatch(actError("Lỗi: Lấy thông tin món ăn không thành công"))
        })
    }
   
}

export function DeleteFood(Food, success) {
    return dispatch =>
    {
        dispatch(actPending())
        let data = [Food.id]
        CallAPI(FOOD_API, "DELETE", data)
            .then(response => {
                if(!response.ok)
                    throw new Error("Server error:" + response.statusText+ "    "+ response.url)
                success()
                dispatch(actDeleteFood(Food))
                    
            })
            .catch((error) => {
                console.log(error)
                dispatch(actError("Xoá thông tin món ăn không thành công!"))
            }); 
    }
}


export function UpdateFood(Food, success) {
    
    return dispatch =>
    {
        dispatch(actPending())
        if(Food.img)
        {
            UploadImage(Food.img)
                .then((res)=>{
                    if(!res.ok)
                        throw new Error("Upload image error:"+ res.status + res.statusText)
                    return res.json()
                })
                .then((res)=>{

                        const data ={
                            id:Food.id,
                            categoryId:Food.category.id,
                            img:res.url,
                            moreInfo:Food.moreInfo,
                            name:Food.name,
                            price:Food.price
                        }

                        CallAPI(FOOD_API,'PUT',data)
                        .then(res=>{
                            if(!res.ok)
                                throw new Error('ERROR:'+ res.status + res.statusText)
                            return res.json();
                        })
                        .then(res=>{
                            success()
                            dispatch(actUpdateFood(res))
                        })
                        .catch(err => {
                            console.log(err)
                            dispatch(actError("Cập nhật thông tin món ăn không thành công!"))})
                })
                .catch(err=>{
                    console.log(err);
                    dispatch(actError("Cập nhật thông tin món ăn không thành công!"))})
        }
        else
        {
            const data = {
                id:Food.id,
                categoryId:Food.category.id,
                img:Food.imgURL,
                moreInfo:Food.moreInfo,
                name:Food.name,
                price:Food.price
            }

            CallAPI(FOOD_API,'PUT',data)
            .then(res=>{
                if(!res.ok)
                    throw new Error('ERROR:'+ res.status + res.statusText)
                
                return res.json()
                
            })
            .then(res=>{
                success()
                dispatch(actUpdateFood(res))
            })
            .catch(err=>{
                console.log(err);
                dispatch(actError("Cập nhật thông tin món ăn không thành công!"))})
        }
    }
}

export  function InsertFood(Food, success)
{
    return dispatch =>{
        dispatch(actPending())
        UploadImage(Food.img)
            .then((res)=>{
                if(!res.ok)
                    throw new Error("ERROR:"+ res.status + res.statusText)
                return res.json()
            })
            .then((res)=>{
                    const data ={
                            categoryId:Food.category.id,
                            img:res.url,
                            moreInfo:Food.moreInfo,
                            name:Food.name,
                            price:Food.price
                    }
                    CallAPI(FOOD_API,'POST',data)
                    .then(res=>{
                        if(!res.ok)
                            throw new Error('ERROR:'+ res.status + res.statusText)
                        return res.json()})
                    .then(res=>{
                        success()
                        dispatch(actInsertFood(res))
                    })
                    .catch(err=>{
                        console.log(err)
                        dispatch(actError("Thêm thông tin món ăn không thành công!"))
                    })
            })
            .catch(err=>{
                console.log(`ERROR upload image: ${err}`);
                dispatch(actError("Thêm thông tin món ăn không thành công!"))
            })
    }
}

export function GetFoodCategory() {
    return dispatch =>
    {   
        dispatch(actPending())
        CallAPI(FOOD_CATEGORY_API, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(data=>{
            dispatch(actInitFoodCategory(data))})
        .catch(err=>{
            console.log(err)
            dispatch(actError("Lỗi: Lấy thông tin loại món ăn không thành công"))
        })
    }   
}

export function DeleteFoodCategory(FoodCategory) {
    return dispatch =>
    {
        let id = [FoodCategory.id]
        dispatch(actPending())
        CallAPI(FOOD_CATEGORY_API,'DELETE',id)
        .then(res=>{
            if(!res.ok)
                throw new Error('ERROR:' + res.status + res.statusText)
            dispatch(actDeleteFoodCategory(FoodCategory))
           
        })
        .catch(err=>{
                dispatch(actError("Xoá thông tin loại món ăn không thành công"))
                console.log(err)
            }
        )
    }
}

export function UpdateFoodCategory(FoodCategory,Success) {
    
    return dispatch =>
    {
        dispatch(actPending())
        CallAPI(FOOD_CATEGORY_API+'/'+FoodCategory.id,"PUT",FoodCategory)
        .then(res=>{
            if(!res.ok)
                throw new Error("ERROR: "+ res.status)
            Success()
            dispatch(actUpdateFoodCategory(FoodCategory))
            
        })
        .catch(err=>{
            dispatch(actError("Cập nhật thông tin loại món ăn không thành công!"))
            console.log(err)
        })
    }
}

export  function InsertFoodCategory(FoodCategory,Success)
{
    
    const data = FoodCategory
    return dispatch =>{
        dispatch(actPending())
       CallAPI(FOOD_CATEGORY_API,"POST",data)
       .then(res=>{
           if(!res.ok)
                throw new Error("ERROR: "+ res.status)
            return res.json();
           
       })
       .then(data=>{
           Success()
           dispatch(actInsertFoodCategory(data))
       })
       .catch(err=>{
           dispatch(actError("Thêm thông tin loại món ăn không thành công!"))
           console.log(err)
       })
    }
}

export function UploadImage(image)
    {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "wedding");
        data.append("folder", "user_image");
        var url = "https://api.cloudinary.com/v1_1/huong/image/upload";

        var option = {
            method: 'POST',
            body: data
        }

        return fetch(url, option)
    }
