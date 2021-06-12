const FOOD_API = "https://wedding-management.herokuapp.com/api/food";
const CATEGORY_API = "https://wedding-management.herokuapp.com/api/food-category"

class FoodService {
    
    GetFoodData(callBack){
        fetch("https://wedding-management.herokuapp.com/api/food")
            .then(res=>{
                if(!res.ok)
                    throw new Error("Server error:" + res.statusText+ "    "+ res.url)
                return res.json()
            })
            .then(res=> {callBack(res)})
            .catch(err=> console.log(err))
    }

    DeleteFood(id, callBack, alert)
    {
        let data = [id]
        var option = {
            method:'DELETE',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        }
        fetch(FOOD_API , option)
            .then(response => {
                if(!response.ok)
                    throw new Error("Server error:" + response.statusText+ "    "+ response.url)
                alert("success","Xoá thông tin thành công")
                callBack("DELETE", id)
                    
            })
            .catch((error) => {
                alert("error","Xoá thông tin không thành công")
                console.error('Error:', error);
            });
    }

    async InsertFood(info, callBack, alert)
    {
        var imgURL ;
        if(info.img)
            imgURL = await this.UploadImage(info.img);
        else
            imgURL = info.imgURL;
        
        var detail={
            name:info.name,
            img: imgURL,
            price: info.price,
            moreInfo: info.moreInfo,
            categoryId: info.category
        }

        var option = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(detail)
        }

        fetch(FOOD_API, option)
            .then(response => {
                if(!response.ok) 
                    throw new Error("Server error:" + response.statusText+ "    "+ response.url)
                return response.json()                    
            })
            .then(data => {
                callBack("INSERT", data);
                alert("success","Thêm thông tin thành công");
            })
            .catch((error) => {
                alert("error","Thêm thông tin không thành công");
                console.error('Error:', error);
            });

    }

    async EditFood(info, callBack, alert)
    {
        var imgURL ;

        if(info.img)
            imgURL = await this.UploadImage(info.img);
        else
            imgURL = info.imgURL;
        
        var detail={
            id:info.id,
            name:info.name,
            img: imgURL,
            price: info.price,
            moreInfo: info.moreInfo,
            categoryId: info.category
        }

        var option = {
            method:'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(detail)
        }

        fetch(FOOD_API,option)
            .then(response => {
                if(!response.ok) 
                    throw new Error("Server error:" + response.statusText+ "    "+ response.url)
                return response.json();
            })
            .then(data => {;
                callBack("EDIT",data)
                alert("success","Cập nhật thông tin thành công")
            })
            .catch((error) => {
                alert("error","Cập nhật thông tin không thành công")
                console.error('Error:', error);
            });
    }

    async GetCategoryData(callBack)
    {

        fetch("https://wedding-management.herokuapp.com/api/food-category")
            .then(response => {
                if(!response.ok)
                    throw new Error("Server error:" + response.statusText+ "    "+ response.url)
                return response.json();
            })
            .then( (data)=>{
                callBack(data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async DeleteCategory(id, callBack,alert)
    {
        var data = [id];
        var option = {
            method:'DELETE',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        }
        fetch(CATEGORY_API,option)
            .then(response => {
                if(!response.ok) 
                    throw new Error("Server error:" + response.statusText+ response.url)
                callBack(id);
                alert("success","Xoá thành công")
            })
            .catch((error) => {
                alert("error","Xoá không thành công")
                console.error(error);
            });

    }

    async EditCategory(info, callBack, alert)
    {
        const URL = CATEGORY_API+"/"+info.id        
        var option = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }

        fetch(URL, option)
            .then(response => {
                if(!response.ok)
                    throw new Error("Server error:" + response.statusText + response.url)
                callBack(info)  
                alert("success","Cập nhật thông tin thành công")
            })

            .catch((error) => {
                alert("error","Cập nhật thông tin không thành công")
                console.error('Error:', error);
            });
    }

    async InsertCategory(info, callBack,alert)
    {
        var data = JSON.stringify(info);
        var option = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: data
        }
        fetch(CATEGORY_API,option)
            .then(response => {
                if(!response.ok) 
                    throw new Error(response.status)
                return response.json();
            })
            .then((data)=>{
                callBack(data);
                alert("success","Thêm thông tin thành công")
            }
        )
            .catch((error) => {
                alert("error","Thêm thông tin không thành công")
                console.error(error);
            });
    }

    async UploadImage(image)
    {
        const data = new FormData()
        data.append("file", image)
        data.append("name", "test")
        data.append("upload_preset", "heheupload")
        // data.append("public_id",'WeddingManagerment')
        data.append("folder",'WeddingManagerment')
        var url = "https://api.cloudinary.com/v1_1/hehohe/image/upload"

        var option = {
            method: 'POST',
            body: data
        }
        const response = fetch(url, option)
            .then(res=>{
                if(!res.ok)
                    throw new Error(res.status + res.statusText + res.url)
                return res.json();
                
            })
            .then(res=>{
                return res.url
            })
            .catch(
                 err => console.log(err)
            )
        return await response;
    }



}

export default new FoodService();