const server = require('./app');

const PORTA = process.env.PORT || 3000;

server.listen(PORTA, () => console.log(`App ouvindo a porta ${PORTA}`));