import express from 'express';
import validate from 'express-validation';
import locationValidation from '../../config/location-validation';
import locationCtrl from '../controllers/location.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/:userId')
  /** GET /api/locations/:userId - Get user */
  .get(locationCtrl.get)

  /** POST /api/locations/:userId - Update user */
  .post(validate(paramValidation.createLocation), locationCtrl.create)

export default router;
