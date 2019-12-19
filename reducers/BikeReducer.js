import Immutable from 'immutable';
import {
    GET_OWNED_BIKES_REQUEST,
    GET_OWNED_BIKES_FAILURE,
    GET_OWNED_BIKES_SUCCESS,
    REFRESH_OWNED_BIKES_REQUEST,
    REFRESH_OWNED_BIKES_FAILURE,
    REFRESH_OWNED_BIKES_SUCCESS,
} from '../actions/BikeAction'

const initialState = Immutable.fromJS({
    bikes: [],
    loading: false,
    error: undefined
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_OWNED_BIKES_REQUEST:
        case REFRESH_OWNED_BIKES_REQUEST:
            return state
                .set('loading', true);
        case GET_OWNED_BIKES_FAILURE:
        case REFRESH_OWNED_BIKES_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.payload);
        case REFRESH_OWNED_BIKES_SUCCESS:
            return state
                .set('loading', false);
        case GET_OWNED_BIKES_SUCCESS:
            return state
                .set('loading', false)
                .set('bikes', action.payload);
        default:
            return state;
    }
}