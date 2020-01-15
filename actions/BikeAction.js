import { Peer } from '../services/PeerService';
import { Storage } from '../services/StorageService';

export const STORAGE_BIKES = 'bikes';
export const SEND_TRANSACTION_URL = '/transaction';

export const GET_OWNED_BIKES_REQUEST = 'get_owned_bikes_request';
export const GET_OWNED_BIKES_FAILURE = 'get_owned_bikes_failure';
export const GET_OWNED_BIKES_SUCCESS = 'get_owned_bikes_success';
export const REFRESH_OWNED_BIKES_REQUEST = 'refresh_owned_bikes_request';
export const REFRESH_OWNED_BIKES_FAILURE = 'refresh_owned_bikes_failure';
export const REFRESH_OWNED_BIKES_SUCCESS = 'refresh_owned_bikes_success';

export const getOwnedBikes = () => {
    return (dispatch) => {
        dispatch(getOwnedBikesRequest());

        return getOwnedBikesAsync().then(function (bikes) {
            dispatch(getOwnedBikesSuccess(bikes));
        }).catch(function (error) {
            dispatch(getOwnedBikesFailure(error));
        });
    }
}

export const refreshOwnedBikes = (publicKey) => {
    return (dispatch) => {
        dispatch(refreshOwnedBikesRequest());

        return refreshOwnedBikesAsync(publicKey).then(function () {
            dispatch(refreshOwnedBikesSuccess());
            dispatch(getOwnedBikes());
        }).catch(function (error) {
            dispatch(refreshOwnedBikesFailure(error));
        });
    }
}

const getOwnedBikesAsync = () => {
    return new Promise(async function (resolve, reject) {
        let ownedBikesString = await Storage.get(STORAGE_BIKES);
        let ownedBikes = [];
        try {
            ownedBikes = JSON.parse(ownedBikesString)
        } catch (e) {
            reject(e);
        }
        if (!Array.isArray(ownedBikes))
            ownedBikes = []

        resolve(ownedBikes);
    });
}

const refreshOwnedBikesAsync = (publicKey) => {
    return new Promise(async function (resolve, reject) {
        let rejectedBikes = [];
        let ownedBikes = [];
        let currentTransactions = [];

        const request = {
            method: 'get',
            params: {
                publicKey: publicKey
            }
        };
        try {
            const response = await Peer.sendRequest(SEND_TRANSACTION_URL, request);
            currentTransactions = response.data;
            currentTransactions = currentTransactions.reverse();
            currentTransactions.forEach(function (transaction) {
                if (rejectedBikes.includes(transaction.id) || ownedBikes.includes(transaction.id)) {
                    return;
                }
                if (transaction.publicKeyOutput.slice(0, -1) === publicKey) {
                    ownedBikes.push(transaction.id);
                } else if (transaction.publicKeyInput.slice(0, -1) === publicKey) {
                    rejectedBikes.push(transaction.id);
                }
            });
        } catch (e) {
            console.log(e);
        }
        Storage.set(STORAGE_BIKES, JSON.stringify(ownedBikes)).then(function () {
            resolve();
        }).catch(function (error) {
            reject(error);
        });
    });
}

const getOwnedBikesRequest = () => {
    return {
        type: GET_OWNED_BIKES_REQUEST
    }
}

const getOwnedBikesFailure = (error) => {
    return {
        type: GET_OWNED_BIKES_FAILURE,
        payload: {
            error
        }
    }
}

const getOwnedBikesSuccess = (bikes) => {
    return {
        type: GET_OWNED_BIKES_SUCCESS,
        payload: bikes
    }
}

const refreshOwnedBikesRequest = () => {
    return {
        type: REFRESH_OWNED_BIKES_REQUEST
    }
}

const refreshOwnedBikesFailure = (error) => {
    return {
        type: REFRESH_OWNED_BIKES_FAILURE,
        payload: {
            error
        }
    }
}

const refreshOwnedBikesSuccess = () => {
    return {
        type: REFRESH_OWNED_BIKES_SUCCESS
    }
}