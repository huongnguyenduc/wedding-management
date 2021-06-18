const API_URL = "";

class AuthService {
    login(data){
        localStorage.setItem('user',true)
        return true
        const option =  {
            method: 'POST',
            headers: {'content-Type': 'aplication/json'},
            body: JSON.stringify(data)
        }
        fetch(API_URL,option)
        .then(response => {
            return response.json();     
        })
        .then(res=>{
            if(res.data.accessToken)
            {
                localStorage.setItem('user',JSON.stringify(res.data.accessToken))
                return true;
            }
            
        }
        )
        .catch(error => {
            
            console.log(error);
        });
    }

    SignUp(){
        
    }

}

export default new AuthService();
