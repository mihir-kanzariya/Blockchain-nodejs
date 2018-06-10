const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../controllers/home.controller.js')
const blockchainController = require('../controllers/blockchain.controller.js')

router.get('/', homeController.home);
router.get('/home', homeController.home);
router.post('/home', blockchainController.home);

module.exports = router;
