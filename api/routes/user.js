const express = require('express')
const user = require('../controller/user')
const auth = require('../middleware/auth')
const {userValidation,schemaValidation} = require('../validation/user')
const router = express.Router();

router.get('/api/v1/user',auth,user.getUser);
router.get('/api/v1/user/:_id',auth,user.getUserById);
router.put('/api/v1/user/:_id',auth,user.putUser);
router.delete('/api/v1/user/:_id',auth,user.deleteUser)
router.post('/api/v1/user',userValidation(),schemaValidation,user.postUser);
router.post('/api/v1/login',user.userLogin)

module.exports = router;