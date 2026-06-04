import { Router } from 'express';
import { TrekController } from '../controllers/trek.controller';
import { authMiddleware } from '../../core/middleware/auth.middleware';

const router = Router();
const controller = new TrekController();

router.get('/treks', controller.getTreks.bind(controller));
router.get('/treks/:id', controller.getTrekById.bind(controller));
router.post('/treks/:id/comments', controller.addComment.bind(controller));
router.get('/treks/:id/comments', controller.getComments.bind(controller));

router.post('/saved/:trekId', authMiddleware, controller.saveRoute.bind(controller));
router.get('/saved', authMiddleware, controller.getSavedRoutes.bind(controller));
router.delete('/saved/:trekId', authMiddleware, controller.removeSavedRoute.bind(controller));

export default router;
