import api from "../api";
    
export class AuthApi{
    constructor(){
        this.api = api
    }
    getUser = async ()=>{
        let token = localStorage.getItem('token')
        if(token){
            this.api.defaults.headers.common['Authorization']=`Token ${token}`
            return await this.api.get("auth/user/")
        }
    }
    logout(){
        localStorage.removeItem('token');
    delete this.api.defaults.headers.common['Authorization'];
    }
    async login(credentials){
        const response = await this.api.post('auth/login/', credentials);
        localStorage.setItem('token', response.data.key);
        this.api.defaults.headers.common['Authorization'] = `Token ${response.data.key}`;
    }
}