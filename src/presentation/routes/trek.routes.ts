import { Router } from 'express';
import { TrekController } from '../controllers/trek.controller';
import { authMiddleware, adminMiddleware } from '../../core/middleware/auth.middleware';
import { upload } from '../../core/middleware/upload.middleware';

const router = Router();
const controller = new TrekController();

router.get('/treks', controller.getTreks.bind(controller));
router.get('/treks/:id', controller.getTrekById.bind(controller));
router.post('/treks/:id/comments', upload.single('image'), controller.addComment.bind(controller));
router.get('/treks/:id/comments', controller.getComments.bind(controller));

// Admin image upload (returns a public URL to store on a trek/contact)
router.post('/upload', authMiddleware, adminMiddleware, upload.single('image'), controller.uploadImage.bind(controller));

// Admin trek management (protected by auth + admin role)
router.post('/treks', authMiddleware, adminMiddleware, controller.createTrek.bind(controller));
router.put('/treks/:id', authMiddleware, adminMiddleware, controller.updateTrek.bind(controller));
router.delete('/treks/:id', authMiddleware, adminMiddleware, controller.deleteTrek.bind(controller));

router.post('/saved/:trekId', authMiddleware, controller.saveRoute.bind(controller));
router.get('/saved', authMiddleware, controller.getSavedRoutes.bind(controller));
router.delete('/saved/:trekId', authMiddleware, controller.removeSavedRoute.bind(controller));

export default router;
