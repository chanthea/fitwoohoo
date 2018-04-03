import { combineReducers } from 'redux';
import storeUserReducer from './storeUserReducer';
export default combineReducers({
    user : storeUserReducer
});