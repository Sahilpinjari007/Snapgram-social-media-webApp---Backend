import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createMedia, deleteMedia, featchMediaById, featchMediaByShortcode, updateMedia } from '../controllers/media.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();


router.route('/create').post(verifyJWT, 
    upload.fields([
        {
            name: "GraphImage",
            maxCount: 1
        },
        {
            name: "GraphVideo",
            maxCount: 1
        },
        {
            name: "GraphSlider",
            maxCount: 10
        }
    ]), createMedia);
router.route('/update/:_id').put(verifyJWT, updateMedia);
router.route('/delete/:_id').delete(verifyJWT, deleteMedia);

router.route('/featchById/:_id').get(verifyJWT, featchMediaById);
router.route('/featchByShortCode/:shortcode').get(verifyJWT, featchMediaByShortcode);


export default router;