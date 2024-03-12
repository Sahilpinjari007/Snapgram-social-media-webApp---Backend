import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { deleteComment, featchComment, featchPostComments, postComment, updateComment } from '../controllers/comment.controller.js';


const router = express.Router();


router.route('/post-comment/:mediaId').post(verifyJWT, postComment);
router.route('/update-comment/:commentId').put(verifyJWT, updateComment);
router.route('/delete-comment/:commentId').delete(verifyJWT, deleteComment);
router.route('/featch-comment/:commentId').get(verifyJWT, featchComment);
router.route('/featch-post-comments/:mediaId').get(verifyJWT, featchPostComments)


export default router