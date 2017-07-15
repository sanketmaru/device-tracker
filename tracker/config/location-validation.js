import Joi from 'joi';

export default {

  // POST /api/locations/:userId
  createLocation: {
    params: {
      userId: Joi.string().hex().required()
    }
  }

};
