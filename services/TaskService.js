import * as BackgroundFetch from 'expo-background-fetch';
import { Platform } from 'react-native';

class Task {

    static register(taskName, interval) {
        return new Promise(async function (resolve, reject) {
            if (Task.exists(taskName))
                reject(new Error("The tasks is already existing"));
            if (Platform.OS === "web")
                reject(new Error("This platform is not supported"));
            const options = {
                minimumInterval: interval,
                stopOnTerminate: false,
                startOnBoot: true,
            };

            BackgroundFetch.registerTaskAsync(taskName, options).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static unregister(taskName) {
        return new Promise(async function (resolve, reject) {
            if (!Task.exists(taskName))
                reject(new Error("The tasks is already existing"));
            if (Platform.OS === "web")
                reject(new Error("This platform is not supported"));
            BackgroundFetch.unregisterTaskAsync(taskName).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static exists() {
        return false;
    }

}

export { Task };