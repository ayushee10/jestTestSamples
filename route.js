const express = require('express');
const router = express.Router();
const controller = require('./controller')

router.post('/createUser', controller.createUser);
router.get('/getUser', controller.getUser);
router.patch('/updateUser', controller.updateUser)

module.exports = router