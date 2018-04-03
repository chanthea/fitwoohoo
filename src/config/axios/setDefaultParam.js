import axios from './axiosWithToken';

export default setDefaultParam = (token)=>{
    axios.defaults.params = {
        token : token
    };
}