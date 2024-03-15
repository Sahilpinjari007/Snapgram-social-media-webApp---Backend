import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware';
import { createStory, deleteStory, featchAllStorys, featchStory } from '../controllers/story.controller';

const router = express.Router();


router.route('/create').post(verifyJWT, createStory);
router.route('/delete/:storyId').delete(verifyJWT, deleteStory);

router.route('/featch/:storyId').get(verifyJWT, featchStory);
router.route('/featchAll/:userId').get(verifyJWT, featchAllStorys);



export default router;