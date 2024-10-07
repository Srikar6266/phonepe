const express = require('express');
const router = express.Router();
const callbackController = require('../controllers/callbackController');

router.post('/payment-callback', callbackController.handleCallback);

module.exports = router;
