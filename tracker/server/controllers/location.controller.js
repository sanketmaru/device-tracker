import Location from '../models/location.model';

/**
 * Get location
 * @returns {Location}
 */
function get(req, res) {
  return res.json(req.user);
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

export default { create };
