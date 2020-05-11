const http = require('http');
const server = http.createServer();

/**
 * Conectando o socket com o server
 */
const io = require('socket.io')(server);

let mensagens = [];
let usuarios = [];

// Evento de conexão
io.on('connection', socket => {
    socket.emit('mensagensAnteriores', mensagens);

    socket.on('enviarMensagem', objetoMensagem => {
        mensagens.push(objetoMensagem);
        socket.broadcast.emit('mensagemRecebida', objetoMensagem);
    });

    socket.emit('listaUsuarios', usuarios);

    socket.on('listaUsuarios', listarUsuario => {
        usuarios.push(listarUsuario);
        socket.broadcast.emit('usuarioAtivo', listarUsuario);
    });
});



module.exports = server;