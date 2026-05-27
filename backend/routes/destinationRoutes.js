import express from 'express';
import { upload } from '../utils/uploadImage.js';

import {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
  deleteDestinationImage,
  getMyDestinations,
} from '../controllers/destinationController.js';

import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Public routes
router.get('/', getAllDestinations);

// ✅ Admin routes
router.get('/admin/my', protect, adminOnly, getMyDestinations);

router.post(
  '/',
  protect,
  adminOnly,
  upload.array('images', 10),
  createDestination
);

router.put(
  '/:id',
  protect,
  adminOnly,
  upload.array('images', 10),
  updateDestination
);

router.delete('/:id', protect, adminOnly, deleteDestination);

router.delete(
  '/:id/images',
  protect,
  adminOnly,
  deleteDestinationImage
);

// ✅ Dynamic route LAST
router.get('/:id', getDestinationById);

export default router;