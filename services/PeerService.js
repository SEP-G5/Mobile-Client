import axios from 'axios';

class Peer {
    static sendRequest(url, request) {
        request = {
            url: `${getOnePeer()}${url}`,
            ...request
        }
        return axios(request);
    }

    getOnePeer() {

    }

    static fetchPeers() {

    }

    static getPeers() {

    }
}

export { Peer };