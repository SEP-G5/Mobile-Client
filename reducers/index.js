import { combineReducers } from 'redux-immutable';
import KeyPairReducer from './KeyPairReducer';
import TransactionReducer from './TransactionReducer';
import BikeReducer from './BikeReducer';

export default combineReducers({
    keyPair: KeyPairReducer,
    transaction: TransactionReducer,
    bike: BikeReducer,
});
