import Immutable from 'immutable';
import { GET_KEYPAIR } from '../actions/KeyPairAction'

const initialState = Immutable.fromJS({
    publicKey: "",
    privateKey: "",
    created: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_KEYPAIR:
            return state
                .set('publicKey', action.payload.publicKey)
                .set('privateKey', action.payload.privateKey);
        default:
            return state;
    }
}