import { AsyncStorage } from 'react-native';
import { MAIN_LOGIN_SUCCESS } from './types';
import axios from '../config/axios/axiosWithToken';
import { withNavigation } from 'react-navigation';

export const mainLogin = () =>  async dispatch => {
        let token = await AsyncStorage.getItem('mainUserToken');
        if (token !== null){

            axios.get('/auth/getuser',{headers :{token : token}})
            .then( res => {
                
            }).catch(error =>{
    
            })
            dispatch({type : MAIN_LOGIN_SUCCESS, payload : token});
            console.log(value);
        }else{
            this.props.navigation.navigate('Login');
        }
    }
