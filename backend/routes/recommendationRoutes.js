import express from 'express';
import {
  recommendHotelsByLocation,
  getHotelRecommendationDetails,
  getLocationRecommendations,
  recommendHotelsByBudget,
} from '../controllers/recommendationController.js';

const router = express.Router();

// Public routes for Travel Data API
router.get('/hotels', recommendHotelsByLocation);
router.get('/hotels/:entityId', getHotelRecommendationDetails);
router.get('/all', getLocationRecommendations);
router.get('/hotels/budget', recommendHotelsByBudget);

export default router;