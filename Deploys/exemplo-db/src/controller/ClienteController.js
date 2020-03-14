const Cliente = require('../model/Cliente');

const controller = {
    recuperarTodos: async (req, res) => {
        let clientes = await Cliente.find();
        res.json(clientes);
    },
    salvar: (req, res) => {
        let cliente = req.body;

        Cliente
            .create(cliente)
            .then(
                clienteSalvo => res.status(201).json(clienteSalvo),
                erro => res.status(400).json({ erro })
            )
            .catch(
                erro => { 
                    console.log(erro);
                    res.status(500).json({ erro })
                }
            );
    }
};

module.exports = controller;