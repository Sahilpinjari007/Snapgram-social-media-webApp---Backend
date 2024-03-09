import express from 'express'
import { changePassword, forgetPassword, login, logout, refreshAccessToken, register } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/refresh-accessToken').post(refreshAccessToken);

// protected routes
router.route('/logout').post(verifyJWT, logout);
router.route('/change-password').post(verifyJWT, changePassword);
router.route('/forget-password').post(forgetPassword)



export default router;