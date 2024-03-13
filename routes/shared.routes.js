import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { shareMedia } from '../controllers/shared.controller.js';


const router = express.Router();


router.route('/:mediaId').post(verifyJWT, shareMedia);


export default router;