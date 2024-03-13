import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { followUser } from '../controllers/follower.controller.js';


const router = express.Router();


router.route('/').post(verifyJWT, followUser)

export default router;