import { AsyncStorage } from 'react-native';

class Storage {

    static set(key, value) {
        return new Promise(async function (resolve) {
            await AsyncStorage.setItem(key, value);
            resolve();
        });
    }

    static get(key) {
        return new Promise(async function (resolve) {
            const data = await AsyncStorage.getItem(key);
            resolve(data);
        });
    }

    static remove(key) {
        return new Promise(async function (resolve) {
            AsyncStorage.removeItem(key);
            resolve();
        });
    }

}

export { Storage };