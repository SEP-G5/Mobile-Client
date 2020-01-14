import axios from 'axios';

export const FETCH_PEER_URL = '/peer';
const DEFAULT_PEERS = [
    "192.168.0.145:8000"
]

class Peer {
    static sendRequest(url, request) {
        request = {
            url: `http://${Peer.getOnePeer()}${url}`,
            ...request
        }
        return axios(request);
    }

    static getOnePeer() {
        const peers = Peer.getPeers();
        const randomValue = Math.floor(Math.random() * peers.length);
        return peers[randomValue];
    }

    static fetchPeers() {
        request = {
            url: `${Peer.getOnePeer()}${url}`,
            method: 'get'
        }
        return axios(request);
    }

    static getPeers() {
        return DEFAULT_PEERS;
    }
}

export { Peer };