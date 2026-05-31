<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout',authController.logout);




module.exports = router;
=======
// Auth Routes
>>>>>>> 83c14efa9074a2257b4cb8a491b1c0877386e9ed
