const socket = io('http://localhost:3000');

const renderizarMensagem = objetoMensagem => {
    const novaLinha = `
        <div>
            <b>${objetoMensagem.usuario}</b>: ${objetoMensagem.mensagem}
        </div>
    `;

    $('#mensagensChat').append(novaLinha);
};

let usuarios = [];

const atualizarListaUsuarios = objetoMensagem => {
    const usuario = objetoMensagem.usuario;
    if(!usuarios.includes(usuario)) {
        usuarios.push(usuario);
        const novoParagrafoUsuario = `<p>${usuario}</p>`;
        $('#listaUsuarios').append(novoParagrafoUsuario);
    }
}

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var fullAlphabet = alphabet + alphabet + alphabet;

function Cipher(){
    var cipherText = $('#mensagem').val();
    var rotacao = 4;
    rotacao = (rotacao % alphabet.length);
    var cipherFrase = '';
  
    for(i = 0; i < cipherText.length; i++){
       var letter = cipherText[i];
       var upper = (letter == letter.toUpperCase());
       letter = letter.toLowerCase();
      
       var index = alphabet.indexOf(letter);
       if(index == -1){
         cipherFrase += letter;
       } else {
         index = ((index + rotacao) + alphabet.length);
         var nextLetter = fullAlphabet[index];
         if(upper) nextLetter = nextLetter.toUpperCase();
         cipherFrase += nextLetter;
       }
    }
      
    $('#mensagem').val(cipherFrase);
    
}
$(document).ready(function() {
    /*$('#mensagem').keypress(function(){
      setTimeout(function(){ Cipher(); },20);
    });*/
    $('#mensagem').blur(function(){
      Cipher();
    });
    $('#mensagem').change(function(){
      setTimeout(Cipher(),20);
    });
})



/*function Decipher(){
    var cipherFrase = $('#chave').val();
    var rotacao = 4;
    rotacao = (rotacao % alphabet.length);
  
    for(i = 0; i < cipherFrase.length; i++){
       var letter = cipherFrase[i];
       var upper = (letter == letter.toUpperCase());
       letter = letter.toLowerCase();
      
       var index = alphabet.indexOf(letter);
       if(index !== -1){
         cipherFrase += letter;
       } else {
         index = ((index - rotacao) + alphabet.length);
         var nextLetter = fullAlphabet[index];
         if(upper) nextLetter = nextLetter.toUpperCase();
         cipherFrase += nextLetter;
       }
    }
      
    $('#mensagem').val(cipherFrase);
    
}
$(document).ready(function() {
    $('#mensagem').keypress(function(){
      setTimeout(function(){ Decipher(); },20);
    });
    $('#mensagem').blur(function(){
      Decipher();
    });
    $('#mensagem').change(function(){
      setTimeout(Decipher(),20);
    });
})*/

const atualizarTelaChat = (objetoMensagem) => {
    renderizarMensagem(objetoMensagem);
    atualizarListaUsuarios(objetoMensagem);
};

socket.on('mensagensAnteriores', 
    mensagens => mensagens.forEach(m => atualizarTelaChat1(m))
);

socket.on('mensagemRecebida', objetoMensagem => {
    atualizarTelaChat(objetoMensagem);
});

$('form').submit(event => {
    event.preventDefault();

    const usuario = $('#usuario').val();
    const mensagem = $('#mensagem').val();
    $('#mensagem').val('');


    const objetoMensagem = { usuario, mensagem };
    socket.emit('enviarMensagem', objetoMensagem);
    atualizarTelaChat(objetoMensagem);
});