import Immutable from 'immutable';
import {
    CREATE_TRANSACTION_REQUEST,
    CREATE_TRANSACTION_FAILURE,
    CREATE_TRANSACTION_SUCCESS,
    VERIFY_TRANSACTION_REQUEST,
    VERIFY_TRANSACTION_FAILURE,
    VERIFY_TRANSACTION_SUCCESS,
    SEND_TRANSACTION_REQUEST,
    SEND_TRANSACTION_FAILURE,
    SEND_TRANSACTION_SUCCESS,
    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_FAILURE,
    GET_TRANSACTIONS_SUCCESS,
    SET_CURRENT_IN_OVERLAY,
    SET_VIEW_DETAIL,
    SET_SN,
    SET_NAME, RESET_REGISTER_BIKE_STATE
} from '../actions/TransactionAction'

const initialState = Immutable.fromJS({
    transaction: {
        id: "",
        timestamp: "",
        publicKeyInput: "",
        publicKeyOutput: "",
        signature: "",
    },
    transactions: [],
    valid: false,
    loading: false,
    success: undefined,
    error: undefined,
    current: undefined,
    viewDetail: false,
    registerForm:{
        sn: '',
        name: ''
    }
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSACTIONS_REQUEST:
        case SEND_TRANSACTION_REQUEST:
        case VERIFY_TRANSACTION_REQUEST:
        case CREATE_TRANSACTION_REQUEST:
            return state
                .set('loading', true).set('success', false);
        case GET_TRANSACTIONS_FAILURE:
        case SEND_TRANSACTION_FAILURE:
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
        case SEND_TRANSACTION_SUCCESS:
            return state
                .set('loading', false).set('success', true);
        case GET_TRANSACTIONS_SUCCESS:
            return state
                .set('transactions', action.payload)
                .set('loading', false);
        case SET_CURRENT_IN_OVERLAY:
            return state.set('current', action.payload);
        case SET_VIEW_DETAIL:
            return state.set('viewDetail', action.payload);
        case SET_SN:
            return state.setIn(['registerForm', 'sn'], action.payload);
        case SET_NAME:
            return state.setIn(['registerForm', 'name'], action.payload);
        case RESET_REGISTER_BIKE_STATE:
            return state.setIn(['registerForm', 'sn'], '')
                        .setIn(['registerForm', 'name'], '')
                        .set('success', undefined)
                        .set('error', undefined);
        default:
            return state;
    }
}