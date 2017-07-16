import Location from '../models/location.model';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Get locations by userId
 * @property {string} req.params.userId - The userId of user.
 * @returns {Location}
 */
function get(req, res) {
  return Location.getByUserId(req.params.userId)
    .then(locations => res.json(locations))
    .catch(e => next(e));
}


/**
 * Create new location
 * @property {string} req.body.lat - The latitude of user.
 * @property {string} req.body.lng - The longitude of user.
 * @returns {Location}
 */
function create(req, res, next) {
  const location = new Location({
    userId: req.params.userId,
    lat: req.body.lat,
    lng: req.body.lng,
    city: req.body.city,
    state: req.body.state,
    city: req.body.city,
    street: req.body.street,
  });

  location.save()
    .then(savedLocation => res.json(savedLocation))
    .catch(e => next(e));
}

function createLocation(location) {
  return Location.getByLatLng(location.userId, location.lat, location.lng)
    .then(function(locations){
      const locationObj = new Location({userId : location.userId, lat : location.lat, lng : location.lng});
      return locationObj.save()
        .then(savedLocation => savedLocation)
        .catch(e => {
          const err = new APIError('Error while saving location!', httpStatus.INTERNAL_SERVER_ERROR);
          return Promise.reject(err);
        });
    }).catch(e => {
      const err = new APIError('locations exists!', httpStatus.FOUND);
      return Promise.reject(err);
    });
}

export default { create, get, createLocation };
