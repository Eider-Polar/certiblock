import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

dotenv.config();

// ws://192.168.101.3:12345
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const P2P_PORT =  process.env.P2P_PORT;

console.log('P2P_PORT:', P2P_PORT);

class P2PServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new WebSocketServer({ host: '0.0.0.0', port: P2P_PORT }); // Modificación aquí
        server.on('connection', socket => this.connectSocket(socket))

        this.connectToPeers();

        console.log('Listening for peer-to-peer connections on port ' + P2P_PORT + " estos son los peer" + peers);
    }
    

    connectToPeers() {
        peers.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('[ + ] Socket connected');
        this.messageHandler(socket);
        this.sendChain(socket);
    }

   
    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            // this.blockchain.isValidChain(data);]}
            this.blockchain.remplaceChain(data)


        });
    }
    
    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains() {
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        });
    }
}
export default P2PServer;
