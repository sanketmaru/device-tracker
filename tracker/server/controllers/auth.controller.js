import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import User from '../models/user.model';

// sample user, used for authentication
// const user = {
//   username: 'react',
//   password: 'express'
// };

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  console.log('Username is', req.body.username);

  User.getByUsernamePassword(req.body.username, req.body.password)
    .then((user) => {
      const token = jwt.sign({
        username: user[0].username
      }, config.jwtSecret);

      return res.json({
        token,
        username: user[0].username,
        _id : user[0].id
      });
    })
    .catch(e => {
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
      next(err)
    });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
