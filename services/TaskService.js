import * as BackgroundFetch from 'expo-background-fetch';

class Task {

    static register(taskName, interval) {
        return new Promise(async function (resolve, reject) {
            if (Task.exists(taskName))
                reject(new Error("The tasks is already existing"));
            const options = {
                minimumInterval: interval,
                stopOnTerminate: false,
                startOnBoot: true,
            };
            BackgroundFetch.registerTaskAsync(taskName, options).then(function () {
                resolve();
            })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    static unregister(taskName) {
        return new Promise(async function (resolve, reject) {
            if (!Task.exists(taskName))
                return;
            BackgroundFetch.unregisterTaskAsync(taskName).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static exists() {
        return true;
    }

}

export { Task };