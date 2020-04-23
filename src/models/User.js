module.exports.UserModel = function() {
  this.user = {
    username: null,
    email: null,
    password: null,
    state: false
  };

  this.fill = function(info) {
    if (info) {
      for (let property in this.values) {
        this.values[property] = info[property];
      }
    }
  };

  this.setNumber = function(name) {
    this.user.name = name;
  };

  this.setOrigin = function(email) {
    this.user.email = email;
  };

  this.setDestination = function(password) {
    this.user.password = password;
  };

  this.setDate = function() {
    this.user.date = true;
  };

  this.getUser = function() {
    return this.user;
  };
  
};
