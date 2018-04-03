import {STORE_USER_OBJECT} from './types';

export const StoreUserAction  = (object) =>{
    return{
        type : STORE_USER_OBJECT,
        payload :object
    }
}