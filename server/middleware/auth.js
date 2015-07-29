var encryption = require('../lib/encryption');

module.exports = {

  isAuthenticated : function(req, res){

    var response = {
      message: "Bad Request",
      success:false,
      code:400
    }
    var token = req.query.token || req.body.token || req.params.token;


    var decryptUser = encryption.decrypt(token);

    if(!user){
      response.message = "Invalid Token";
      res.jsonp(response);
      return;
    }

    if(decryptUser.expires < Date.now()){
      response.message = "Token Expired";
      res.jsonp(response);
      return;
    }
  }
}
