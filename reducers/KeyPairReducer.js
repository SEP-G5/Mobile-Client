import Immutable from 'immutable';
import { GET_KEYPAIR_SUCCESS, DELETE_KEYPAIR_SUCCESS } from '../actions/KeyPairAction'

const initialState = Immutable.fromJS({
    publicKey: "",
    privateKey: "",
    created: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_KEYPAIR_SUCCESS:
            return state
                .set('publicKey', action.payload.publicKey)
                .set('privateKey', action.payload.privateKey);
        case DELETE_KEYPAIR_SUCCESS:
            return state
                .set('publicKey', "")
                .set('privateKey', "");
        default:
            return state;
    }
}