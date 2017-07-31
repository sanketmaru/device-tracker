import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const LocationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: false
  },
  lng: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  streetName: {
    type: String,
    required: false
  },
  formattedAddress: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
LocationSchema.method({
});

/**
 * Statics
 */
LocationSchema.statics = {


  /**
   * Get locations by user Id
   * @param {userId} userId - The userId of user.
   * @returns {Promise<User, APIError>}
   */
  getByUserId(userId) {
    return this.find({userId : userId})
      .exec()
      .then((locations) => {
        if (locations) {
          return locations;
        }
        const err = new APIError('No such locations exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * find locations by Lat, Lng
   * @param {userId} userId - The userId of user.
   * @returns {Promise<User, APIError>}
   */
  getByLatLng(userId, lat, lng) {
    return this.find({userId :userId, lat : lat, lng : lng})
      .exec()
      .then((locations) => {
        if (locations.length) {
          const err = new APIError('locations exists!', httpStatus.FOUND);
          return Promise.reject(err);
        }
        return locations;
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('Location', LocationSchema);