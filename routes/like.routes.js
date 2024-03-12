import express from 'express';
import { toggleCommentLike, toggleMediaLike } from '../controllers/like.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.route('/m/:mediaId').post(verifyJWT, toggleMediaLike);
router.route('/c/:commentId').post(verifyJWT, toggleCommentLike);

export default router;
