const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server);

let mensagens = [];

io.on('connection', socket => {
    socket.emit('mensagensAnteriores', mensagens);

    socket.on('enviarMensagem', objetoMensagem => {
        mensagens.push(objetoMensagem);
        socket.broadcast.emit('mensagemRecebida', objetoMensagem);
    });
});

module.exports = server;