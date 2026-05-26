import express from 'express';
import { upload } from '../utils/uploadImage.js';

import {
  createPackage,
  getAllPackages,
  getPackageById,
  getPackagesByDestination,
  updatePackage,
  deletePackage,
  deletePackageImage,
  getMyPackages,
} from '../controllers/packageController.js';

import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Public routes
router.get('/', getAllPackages);

router.get(
  '/destination/:destinationId',
  getPackagesByDestination
);

// ✅ Admin routes
router.get('/admin/my', protect, adminOnly, getMyPackages);

router.post(
  '/',
  protect,
  adminOnly,
  upload.array('images', 10),
  createPackage
);

router.put(
  '/:id',
  protect,
  adminOnly,
  upload.array('images', 10),
  updatePackage
);

router.delete('/:id', protect, adminOnly, deletePackage);

router.delete(
  '/:id/images',
  protect,
  adminOnly,
  deletePackageImage
);

// ✅ Dynamic route LAST
router.get('/:id', getPackageById);

export default router;