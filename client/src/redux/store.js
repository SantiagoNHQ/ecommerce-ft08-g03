import { createStore } from 'redux';
import rootReducer from './reducer';

export default createStore(rootReducer, window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION_());