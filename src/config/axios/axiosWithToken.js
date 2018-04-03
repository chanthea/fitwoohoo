import axios from 'axios';
import {AsyncStorage} from 'react-native';

const instance = axios.create({
    baseURL : 'https://www.fitwoohoo.com/api/m',
    // params: {
    //     token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vd3d3LmZpdHdvb2hvby5jb20vYXBpL20vYXV0aC9nZXR0b2tlbiIsImlhdCI6MTUyMjY5MjM2NywiZXhwIjoxNTI1Mjg0MzY3LCJuYmYiOjE1MjI2OTIzNjcsImp0aSI6IjV5MzFhM0FJV1Q0ejVINGgifQ.i0Hi-RZc0cdKRHgZ0bQpQnCqN7egRLBZCxl4qxPeniE'
    // },

});
// AsyncStorage.getItem('userToken').then(res =>{
//     instance.defaults.params = {
//         token : res
//     };
// });



instance.interceptors.request.use(request =>{
    return request;
    }, error => {
    return Promise.reject(error);
    });
    
instance.interceptors.response.use(response => {
    return response;
    }, error => {
    return Promise.reject(error);
});

  
export default instance;
