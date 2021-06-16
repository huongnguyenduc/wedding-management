import {actInitLobby,actInsertLobby,actUpdateLobby,actDeleteLobby,actInitLobbyCategory,actInsertLobbyCategory,actUpdateLobbyCategory,actDeleteLobbyCategory,actError, actPending} from './actions/actions';

export const API_SERVER = "https://wedding-management.herokuapp.com/api/";
const LOBBY_API = 'lobby'
const LOBBY_CATEGORY_API = "lobbycategory"
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

export function GetLobby() {
    return dispatch =>
    {   
        dispatch(actPending())
        CallAPI(LOBBY_API, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(data=>{
            dispatch(actInitLobby(data))})
        .catch(err=>{
            console.log(err)
        })
    }
   
}

export function DeleteLobby(Lobby) {
    return dispatch =>
    {
        dispatch(actPending())
        CallAPI(LOBBY_API +'/'+ Lobby.id,'DELETE')
        .then(res=>{
            if(!res.ok)
                throw new Error('ERROR:' + res.status + res.statusText)
            dispatch(actDeleteLobby(Lobby))
        })
        .catch(err=>{
            console.log(err)
            dispatch(actError("Xoá thông tin sảnh không thành công!"))
        })
    }
}

export function UpdateLobby(Lobby, success) {
    
    return dispatch =>
    {
        
        if(Lobby.image)
        {
            dispatch(actPending())
            UploadImage(Lobby.image)
                .then((res)=>{
                    if(!res.ok)
                        throw new Error("Upload image error:"+ res.status + res.statusText)
                    return res.json()
                })
                .then((res)=>{
                        const data ={
                            id:Lobby.id,
                            idLobbyCategory:Lobby.lobbyCategory.id,
                            name:Lobby.name,
                            image:res.url,
                            maxtable:Lobby.maxTable,
                            minUnitPriceTable:Lobby.minUnitPriceTable
                        }
                        CallAPI(LOBBY_API,'PUT',data)
                        .then(res=>{
                            if(!res.ok)
                                throw new Error('ERROR:'+ res.status + res.statusText)
                            success()
                            dispatch(actUpdateLobby(Lobby))

                        })
                        .catch(err => {
                            console.log(err)
                            dispatch(actError("Cập nhật thông tin sảnh không thành công!"))})
                })
                .catch(err=>{
                    console.log(err);
                    dispatch(actError("Cập nhật thông tin sảnh không thành công!"))})
        }
        else
        {
            const data ={
                id:Lobby.id,
                idLobbyCategory:Lobby.lobbyCategory.id,
                name:Lobby.name,
                image:Lobby.imageURL,
                maxtable:Lobby.maxTable,
                minUnitPriceTable:Lobby.minUnitPriceTable
            }

            dispatch(actPending())
            CallAPI(LOBBY_API,'PUT',data)
            .then(res=>{
                if(!res.ok)
                    throw new Error('ERROR:'+ res.status + res.statusText)
                success()
                dispatch(actUpdateLobby(Lobby))
            })
            .catch(err=>{
                console.log(err);
                dispatch(actError("Cập nhật thông tin sảnh không thành công!"))})
        }
    }
}

export  function InsertLobby(Lobby, success)
{
    return dispatch =>{
        dispatch(actPending())
        UploadImage(Lobby.image)
            .then((res)=>{
                if(!res.ok)
                    throw new Error("ERROR:"+ res.status + res.statusText)
                return res.json()
            })
            .then((res)=>{
                    const data = {
                        idLobbyCategory:Lobby.lobbyCategory.id,
                        name:Lobby.name,
                        image:res.url,
                        maxtable:Lobby.maxTable,
                        minUnitPriceTable:Lobby.minUnitPriceTable
                    }
                    CallAPI(LOBBY_API,'POST',data)
                    .then(res=>{
                        if(!res.ok)
                            throw new Error('ERROR:'+ res.status + res.statusText)
                        return res.json()})
                    .then(res=>{
                        success()
                        dispatch(actInsertLobby(res))
                    })
                    .catch(err=>{
                        console.log(err)
                        dispatch(actError("Thêm thông tin sảnh không thành công!"))
                    })
            })
            .catch(err=>{
                console.log(err);
                dispatch(actError("Thêm thông tin sảnh không thành công!"))
            })
    }
}

export function GetLobbyCategory() {
    return dispatch =>
    {  
        dispatch(actPending())
        CallAPI(LOBBY_CATEGORY_API, "GET")
        .then(res=>{
            if(!res.ok)
                throw new Error('err'+res.status)
            return res.json()
        })
        .then(data=>{
            dispatch(actInitLobbyCategory(data))})
        .catch(err=>{
            console.log(err)
        })
    }   
}

export function DeleteLobbyCategory(LobbyCategory) {
    const id = [LobbyCategory.id]
    return dispatch =>
    {
        dispatch(actPending())
        CallAPI(LOBBY_CATEGORY_API+'/'+id,'DELETE')
        .then(res=>{
            if(!res.ok)
                throw new Error('ERROR:' + res.status + res.statusText)
            dispatch(actDeleteLobbyCategory(LobbyCategory))
           
        })
        .catch(err=>{
                dispatch(actError("Xoá thông tin loại sảnh không thành công"))
                console.log(err)
            }
        )
    }
}

export function UpdateLobbyCategory(LobbyCategory, success) {
    
    return dispatch =>
    {
        dispatch(actPending())
        CallAPI(LOBBY_CATEGORY_API,"PUT",LobbyCategory)
        .then(res=>{
            if(!res.ok)
                throw new Error("ERROR: "+ res.status)
            dispatch(actUpdateLobbyCategory(LobbyCategory))
            success()
            
        })
        .catch(err=>{
            dispatch(actError("Cập nhật thông tin loại sảnh không thành công!"))
            console.log(err)
        })
    }
}

export  function InsertLobbyCategory(LobbyCategory, success)
{
    
    const data = LobbyCategory
    return dispatch =>{
        dispatch(actPending())
       CallAPI(LOBBY_CATEGORY_API,"POST",data)
       .then(res=>{
           if(!res.ok)
                throw new Error("ERROR: "+ res.status)
            return res.json();
           
       })
       .then(data=>{
           dispatch(actInsertLobbyCategory(data))
           success()
       })
       .catch(err=>{
           dispatch(actError("Thêm thông tin loại sảnh không thành công!"))
           console.log(err)
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
