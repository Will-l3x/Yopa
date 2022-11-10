const express = require('express');
const router = express.Router();


const { registerAuth, loginAuth, getMe, DeleteAuth } = require('../controllers/Auth')


const { protect } = require('../middleware/authMiddleware')



///////////////////////////authentification routes//////////////
router.post('/', registerAuth)
router.post('/login', loginAuth)
router.delete('/delete', DeleteAuth)
router.get('/me', protect, getMe)


 
module.exports = router;