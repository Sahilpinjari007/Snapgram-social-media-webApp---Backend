import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { commetnLiked, mediaCommented, mediaLiked, mediaSaved, mediaShared, userFollwed } from '../controllers/notification.controller.js';


const router = express.Router();



router.route('/p/liked/:mediaId').post(verifyJWT, mediaLiked);
router.route('/p/commented/:mediaId').post(verifyJWT, mediaCommented);
router.route('/p/shared/:mediaId').post(verifyJWT, mediaShared);
router.route('/p/saved/:mediaId').post(verifyJWT, mediaSaved);
router.route('/c/liked/:commentId').post(verifyJWT, commetnLiked);
router.route('/u/follow/:notifyToId').post(verifyJWT, userFollwed);


export default router;