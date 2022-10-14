const express = require('express');
const router = express.Router();


const { registerAuth, loginAuth, getMe } = require('../controllers/Auth')


const { protect } = require('../middleware/authMiddleware')



///////////////////////////authentification routes//////////////
router.post('/', registerAuth)
router.post('/login', loginAuth)
router.get('/me', getMe)



module.exports = router;