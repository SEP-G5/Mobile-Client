import Immutable from 'immutable';
import {
    CREATE_TRANSACTION_REQUEST,
    CREATE_TRANSACTION_FAILURE,
    CREATE_TRANSACTION_SUCCESS,
    VERIFY_TRANSACTION_REQUEST,
    VERIFY_TRANSACTION_FAILURE,
    VERIFY_TRANSACTION_SUCCESS,
} from '../actions/TransactionAction'

const initialState = Immutable.fromJS({
    transaction: {
        id: "",
        timestamp: "",
        publicKeyInput: "",
        publicKeyOutput: "",
        signature: "",
    },
    valid: false,
    loading: false,
    error: undefined
});

export default (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_TRANSACTION_REQUEST:
        case CREATE_TRANSACTION_REQUEST:
            return state
                .set('loading', true);
        case VERIFY_TRANSACTION_FAILURE:
        case CREATE_TRANSACTION_FAILURE:
            return state
                .set('error', action.payload)
                .set('loading', false);
        case VERIFY_TRANSACTION_SUCCESS:
            return state
                .set('valid', action.payload.valid)
                .set('loading', false);
        case CREATE_TRANSACTION_SUCCESS:
            return state
                .set('transaction', action.payload)
                .set('loading', false);
        default:
            return state;
    }
}