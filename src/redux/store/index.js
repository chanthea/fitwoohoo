import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middleWare = applyMiddleware(thunk);
const store = createStore(
    reducers,
    {},
    compose( middleWare )  
);

export default store;