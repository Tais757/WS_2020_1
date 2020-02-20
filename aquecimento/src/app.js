const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const hello = require('./routes/hello');

// O nosso app de backend!
const app = express();

/**
 * Configuração de permissão de acesso aos
 * nossos web services / endpoints.
 * No caso, iremos deixar nosso web services
 * público.
 */
app.use(cors());

// Configuração dos logs da aplicação
app.use(logger('dev'));

/**
 * Organiza todos os serviços relacionados
 * a boas vindas (hello) no caminho /hello
 */
app.use('/hello', hello);

module.exports = app;