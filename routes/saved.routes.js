import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { saveMedia } from '../controllers/saved.controller.js';


const router = express.Router();


router.route('/:mediaId').post(verifyJWT, saveMedia)

export default router;