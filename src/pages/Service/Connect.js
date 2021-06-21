import {actInsertServices, actUpdateService, actDeleteService,actInitServices, actError, actPending} from './actions/actions';
import {getCookie} from '../../action/Login'
export const API_SERVER = "https://wedding-management.herokuapp.com/api/";
const SERVICE_API = 'service'

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

export function GetServices() {
    return dispatch =>
    {   dispatch(actPending())
        CallAPI(SERVICE_API, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(res=>{
            dispatch(actInitServices(res))})
        .catch(()=>{
            dispatch(actError("Lỗi: Lấy thông tin dịch vụ không thành công!"))
        })
    }
   
}

export function DeleteService(service) {
    const id = [service.id]
    return dispatch =>
    {
        dispatch(actPending())
        CallAPI(SERVICE_API,'DELETE', id)
        .then(res=>{
            if(!res.ok)
                throw new Error('ERROR:' + res.status + res.statusText)
            dispatch(actDeleteService(service))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(actError("xoá dịch vụ không thành công!"))
        
        })
    }
}

export function UpdateService(service, success) {
    
    return dispatch =>
    {
        if(service.img)
        {
            dispatch(actPending())
            UploadImage(service.img)
                .then((res)=>{
                    if(!res.ok)
                        throw new Error("ERROR:"+ res.status + res.statusText)
                    return res.json()
                })
                .then((res)=>{
                        const data = {
                            id:service.id,
                            img:res.url,
                            name:service.name,
                            price:service.price,
                            moreInfo:service.moreInfo
                        }
                        CallAPI(SERVICE_API+'/'+data.id,'PUT',data)
                        .then(res=>{
                            if(!res.ok)
                                throw new Error('ERROR:'+ res.status + res.statusText)
                            dispatch(actUpdateService(data))
                            success()
                        })
                        .catch((err)=>{
                            console.log(err)
                            dispatch(actError("Cập nhật dịch vụ không thành công!"))
                        
                        })
                })
                .catch(err=>{
                    console.log(err);
                    dispatch(actError("Cập nhật dịch vụ không thành công!"))
                })
        }
        else
        {
            dispatch(actPending())
            const data = {
                id:service.id,
                img:service.imgURL,
                name:service.name,
                price:service.price,
                moreInfo:service.moreInfo
            }
            CallAPI(SERVICE_API,'PUT',data)
            .then(res=>{
                if(!res.ok)
                    throw new Error('ERROR:'+ res.status + res.statusText)
                dispatch(actUpdateService(data))
            })
            .catch(err=>{
                console.log(err);
                dispatch(actError("Cập nhật dịch vụ không thành công!"))})
        }
    }
}

export  function InsertService(service, success)
{
    
    return dispatch =>{
        dispatch(actPending())
        UploadImage(service.img)
            .then((res)=>{
                if(!res.ok)
                    throw new Error("ERROR:"+ res.status + res.statusText)
                return res.json()
            })
            .then((res)=>{
                    const data = {
                        img:res.url,
                        name:service.name,
                        price:service.price,
                        moreInfo:service.moreInfo
                    }
                    CallAPI(SERVICE_API,'POST',data)
                    .then(res=>{
                        if(!res.ok)
                            throw new Error('ERROR:'+ res.status + res.statusText)
                        return res.json()})
                    .then(res=>{
                        dispatch(actInsertServices(res))
                        success();
                    })
                    .catch(err=>{
                        console.log(err)
                        dispatch(actError("Thêm dịch vụ không thành công!"))
                    })
            })
            .catch(err=>{
                console.log(err);
                dispatch(actError("Thêm dịch vụ không thành công!"))
            })
    }
}

export function UploadImage(image)
    {
        const data = new FormData()
        data.append("file", image)
        data.append("name", "test")
        data.append("upload_preset", "heheupload")
        data.append("folder",'WeddingManagerment')
        var url = "https://api.cloudinary.com/v1_1/hehohe/image/upload"

        var option = {
            method: 'POST',
            body: data
        }
        return fetch(url, option)
    }
