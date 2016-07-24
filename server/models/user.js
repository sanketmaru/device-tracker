/**
 * Created by sanketmaru.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require("q");
var bcrypt   = require('bcrypt-nodejs');
//var nconf = require('nconf');

var usersSchema = new Schema({
    email        : String,
    password     : String,
    userType: String
});

usersSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


usersSchema.statics.getAllUsers = function () {
    var deferred = Q.defer();
    Users.find({}, function(err, users) {
        if (err) {
            console.log("Failed to retrieve users.");
            deferred.reject(new Error(err));
        }
        deferred.resolve(users);

    });
    return deferred.promise;
};

usersSchema.statics.saveNewUser = function(email, password){
    var deferred = Q.defer();
    var newUser  = new Users({
        email:email,
        password:Users.generateHash(password),
        userType:1
    });
    newUser.save(function(err, user) {
        if (err) {
            console.log("Failed to save user.");
            return deferred.reject(new Error(err));
        }
        return deferred.resolve(user);

    });
    return deferred.promise;   
};

usersSchema.statics.findUserByUsername = function(username) {
    var deferred = Q.defer();
    Users.find({
        'email' : username
    }, function(err, users) {
        if (err) {
            console.log("Failed to retrieve users.");
            deferred.reject(new Error(err));
        }
        deferred.resolve(users);

    });
    return deferred.promise;

}


var Users = mongoose.model('users', usersSchema);

module.exports = Users;