const mongoose = require('mongoose');

const esquema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: String
});

const Cliente = mongoose.model('Cliente', esquema);
module.exports = Cliente; 