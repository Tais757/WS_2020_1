const socket = io('http://localhost:3000');

const renderizarMensagem = objetoMensagem => {
    const novaLinha = `
        <div>
            <b>${objetoMensagem.usuario}</b>: ${objetoMensagem.mensagem}
        </div>
    `;

    $('#mensagensChat').append(novaLinha);
};

socket.on('mensagensAnteriores', 
    mensagens => mensagens.forEach(m => renderizarMensagem(m))
);

socket.on('mensagemRecebida', objetoMensagem => {
    renderizarMensagem(objetoMensagem);
});

const renderizarListaUsuario = listarUsuario => {
    const novaLinha = `
        <div>
            <b>${listarUsuario.usuario}</b>
        </div>
    `;

    $('#usuarios').append(novaLinha);
};

socket.on('listaUsuarios', usuarios => usuarios.forEach(user => renderizarListaUsuario(user)));

socket.on('usuarioAtivo', listarUsuario => {
    renderizarListaUsuario(listarUsuario);
});

// pega o evento do formulário
$('form').submit(event => {
    event.preventDefault();

    const usuario = $('#usuario').val();
    const mensagem = $('#mensagem').val();
    $('#mensagem').val(''); // limpar o campo

    const objetoMensagem = { usuario, mensagem };
    socket.emit('enviarMensagem', objetoMensagem);
    renderizarMensagem(objetoMensagem);
});

$('div').submit(event => {
    event.preventDefault();

    const usuarios = $('#usuarios').val();
    const lista = $('#listaUsuarios').val();
    $('#listaUsuarios').val('');

    const listarUsuario = { usuarios, lista };
    socket.emit('listaUsuarios', listarUsuario);
    renderizarListaUsuario(listarUsuario);
});