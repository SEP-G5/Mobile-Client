import { combineReducers } from 'redux-immutable';
import KeyPairReducer from './KeyPairReducer';
import TransactionReducer from './TransactionReducer';

export default combineReducers({
    keyPair: KeyPairReducer,
    transaction: TransactionReducer,
});
