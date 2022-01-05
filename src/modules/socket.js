const { WebSocketServer, OPEN } = require('ws');

module.exports = {
    webSocket: null,

    init(server) {
        this.webSocket = new WebSocketServer({ server });
    },

    send(type, data) {
        this.webSocket.clients.forEach(client => {
            if (client.readyState === OPEN) {
                client.send(JSON.stringify({ type, data }));
            }
        });
    }
};
