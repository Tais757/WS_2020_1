const express = require('express');

const uploadCtrl = require('../controller/UploadController');

const router = express.Router();

router.post('/', uploadCtrl.realizarUpload);

module.exports = router;