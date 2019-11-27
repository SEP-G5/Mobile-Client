import Immutable from 'immutable';
import {
    GET_KEYPAIR_REQUEST,
    GET_KEYPAIR_FAILURE,
    GET_KEYPAIR_SUCCESS,
    CREATE_KEYPAIR_REQUEST,
    CREATE_KEYPAIR_FAILURE,
    CREATE_KEYPAIR_SUCCESS,
    DELETE_KEYPAIR_REQUEST,
    DELETE_KEYPAIR_FAILURE,
    DELETE_KEYPAIR_SUCCESS,
    SET_VIEW_KEY
} from '../actions/KeyPairAction'

const initialState = Immutable.fromJS({
    publicKey: "",
    privateKey: "",
    created: false,
    loading: false,
    error: undefined,
    viewKey: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_KEYPAIR_REQUEST:
        case GET_KEYPAIR_REQUEST:
            return state
                .set('loading', true);
        case CREATE_KEYPAIR_REQUEST:
            return state
                .set('created', false)
                .set('loading', true);
        case CREATE_KEYPAIR_FAILURE:
        case DELETE_KEYPAIR_FAILURE:
        case GET_KEYPAIR_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.payload);
        case CREATE_KEYPAIR_SUCCESS:
        case GET_KEYPAIR_SUCCESS:
            return state
                .set('loading', false)
                .set('created', true)
                .set('publicKey', action.payload.publicKey)
                .set('privateKey', action.payload.privateKey);
        case DELETE_KEYPAIR_SUCCESS:
            return state
                .set('loading', false)
                .set('created', false)
                .set('publicKey', "")
                .set('privateKey', "");
      case SET_VIEW_KEY:
            return state.set('viewKey', action.payload)
        default:
            return state;
    }
}