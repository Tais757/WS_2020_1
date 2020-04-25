const express = require('express');

const downloadCtrl = require('../controller/DownloadController');

const router = express.Router();

router.get('/listar', downloadCtrl.listarTodosArquivos);
router.get('/:id', downloadCtrl.realizarDownload);

module.exports = router;