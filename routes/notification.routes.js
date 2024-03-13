import express from 'express'

const router = express.Router();




router.route('/p/liked/')
router.route('/p/commented/')
router.route('/p/shared/')
router.route('/p/saved/')
router.route('/s/liked/')
router.route('/c/liked/')
router.route('/u/follow/')


export default router;