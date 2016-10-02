
angular.module('app.auth', [])
  
  .factory('Auth', function() {
    var ref = new Firebase('https://glowing-heat-727.firebaseio.com')
    var authData = ref.getAuth();

    // function to check user status
    // TODO: rewrite
    function isUserLoggedIn() {
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        return true;
    } else {
        console.log("User is logged out.");
        return false;
      }
    }

    // function to log user in
    function login(email, password, success, err) {
      ref.authWithPassword({
        email: email,
        password: password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          err();
        } else {
          console.log("Authenticated successfully with payload:", authData);
          success();
        }
      }); 
    }

    // function to log user out
    function logout(cb) {
      ref.unauth();
      cb();
    }

    return {
      isUserLoggedIn: isUserLoggedIn,
      login: login,
      logout: logout
    }
  })