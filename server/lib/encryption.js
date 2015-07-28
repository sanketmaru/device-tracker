var crypto = require('crypto');

module.exports = {
  decrypt: function(token) {
    var decrypted = null;
    try {
      var decipher = crypto.createDecipher('AES256', appConfig.privateAESKey);
      var dy = decipher.update(token, 'hex', 'utf8');
      decrypted = dy += decipher.final('utf8');
    } catch (err) {
      return 'error';
    }
    return JSON.parse(decrypted);
  },
  encrypt: function(user, id, exp, ref) {
    var encrypted = null;
    var cipher = crypto.createCipher('AES256', appConfig.privateAESKey);
    ref = ref || '';
    var referer = ref.match(/(https?\:\/\/)?([a-z0-9\-]+\.)+[a-z0-9\-]{2,8}/ig);
    var key = {
      user: user,
      id: id,
      expires: exp,
      referer: ref ? ref : null
    }
    return function(orgId) {
      key.org = orgId;
      var text = JSON.stringify(key);
      var cy = cipher.update(text, 'utf8', 'hex');
      encrypted = cy += cipher.final('hex');
      return encrypted;
    }
  },
  generateHash: function(username, email) {
    try {
      var epoch = new Date().getTime();
      var cipher = crypto.createCipher('AES256', appConfig.privateAESKeyHash);
      var cy = cipher.update('{\"user\":\"' + username + '\",\"email\":' + ((email) ? '\"' + email + '\"' : null) + ',\"generated\":' + ((epoch) ? '\"' + epoch + '\"' : null) + '}', 'utf8', 'hex');
      encrypted = cy += cipher.final('hex');
    } catch (err) {
      return 'error';
    }
    return encrypted;
  },
  hashPassword: function(password, createdDate) {
    try {
      var body = {
        password: password,
        createdDate: createdDate
      };
      var hash = crypto.createHash('sha512');
      hash.update(JSON.stringify(body));
      return hash.digest('hex');
    } catch (e) {
      return false;
    }
  }
}
