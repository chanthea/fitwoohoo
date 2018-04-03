
import {STORE_USER_OBJECT} from '../actions/types';
import StoreUserAction from '../actions/StoreUserAction';
const INITIAL_STATE = {user : null};
export default (state = INITIAL_STATE, action) => {
        switch(action.type){
                case STORE_USER_OBJECT:
                        return {...state, user : action.payload}
                default:
                        return state
        }
};