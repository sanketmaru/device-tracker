var crypto = require('crypto'),
    algorithm = 'aes-256-ctr', // take it from the config
    password = 'd6F3Efeq';

module.exports = {
	encrypt : function(){
		var cipher = crypto.createCipher(algorithm,password)
	  var crypted = cipher.update(text,'utf8','hex')
	  crypted += cipher.final('hex');
	  return crypted;
	},

	decrypt : function(){
		var decipher = crypto.createDecipher(algorithm,password)
	  var dec = decipher.update(text,'hex','utf8')
	  dec += decipher.final('utf8');
	  return dec;
	}

}
