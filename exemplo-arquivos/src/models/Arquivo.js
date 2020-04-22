const {
    createModel
} = require('mongoose-gridfs');

const Arquivo = createModel({
    modelName: 'Arquivo'
});

module.exports = Arquivo;