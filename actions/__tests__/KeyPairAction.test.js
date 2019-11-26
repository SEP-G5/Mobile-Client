import configureMockStore from 'redux-mock-store'
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import * as actions from '../KeyPairAction'
import { SET_VIEW_KEY } from '../KeyPairAction'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('KeyPair action', () => {

    beforeEach(async () => {
        await AsyncStorage.removeItem('PUBLIC_KEY');
        await AsyncStorage.removeItem('PRIVATE_KEY');
    })

    afterEach(() => {
        fetchMock.restore()
    });

    it('should create a keypair when we call getKeyPair and there is no keypair existing', () => {
        const expectedActions = [
            { type: actions.GET_KEYPAIR_REQUEST },
            { type: actions.CREATE_KEYPAIR_REQUEST }
        ]
        const store = mockStore({ 
            publicKey: "",
            privateKey: "",
            created: false,
            loading: false,
            error: undefined,
            viewKey: false
        });

        return store.dispatch(actions.getKeyPair()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('should set viewKey state value when calling setViewKey to true.', () => {
        const expectedActions = [
          {type: actions.SET_VIEW_KEY,
           payload: true
          }
        ]
        const store = mockStore({
            publicKey: "",
            privateKey: "",
            created: false,
            loading: false,
            error: undefined,
            viewKey: false
        });

        store.dispatch(actions.setViewKey(true));

        return expect(store.getActions()).toEqual(expectedActions);
    });

  it('should set viewKey state value when calling setViewKey to false.', () => {
    const expectedActions = [
      {type: actions.SET_VIEW_KEY,
        payload: false
      }
    ]
    const store = mockStore({
      publicKey: "",
      privateKey: "",
      created: false,
      loading: false,
      error: undefined,
      viewKey: true
    });

    store.dispatch(actions.setViewKey(false));
    return expect(store.getActions()).toEqual(expectedActions);

  });

});