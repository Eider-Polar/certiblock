const webSocket = require('ws');
require('dotenv').config();

const peers = process.env.peers ? process.env.peers.split(',') : [];
const P2P_PORT = process.env.P2P_PORT || 5009 || process.argv[2];

console.log(P2P_PORT);

class P2PServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new webSocket.Server({ host: '0.0.0.0', port: P2P_PORT }); // Modificación aquí
        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log('Listening for peer-to-peer connections on port ' + P2P_PORT + " estos son los peer" + peers);
    }
    

    connectToPeers() {
        peers.forEach(peer => {
            const socket = new webSocket(peer);
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
        console.log("aqui entro")
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

module.exports = P2PServer;
