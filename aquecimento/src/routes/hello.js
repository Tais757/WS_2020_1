const express = require('express');

const helloController = require('../controllers/hello_controller');

const router = express.Router();

// Web service/endpoint
router.get('/', helloController.sendHello);

module.exports = router;