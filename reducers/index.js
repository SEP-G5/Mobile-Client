import { combineReducers } from 'redux-immutable';
import KeyPairReducer from './KeyPairReducer';

export default combineReducers({
    keyPair: KeyPairReducer,
});
