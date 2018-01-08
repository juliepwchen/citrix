var app = angular.module('autoTimeLoggingApp');
app.controller("LoginController", ['$scope', '$rootScope', '$http', function(sc, rs, hp) {
    sc.isLogin = "";
	sc.login = function () {
		console.log("Email Address = " + sc.EmailAddress);
		console.log("Password = " + sc.Password);
    	hp.get("http://jbossews-hybridteam.rhcloud.com/login?"+"username=" + sc.EmailAddress + "&password=" + sc.Password )
        .success(function (response) {
          console.log("response.IsAuthenicated = " + response.IsAuthenicated);
          console.log("response.Username = " + response.Username);
          console.log("response.Password = " + response.Password);
          sc.isLogin = response.IsAuthenicated;
          console.log("SC.isLogin = " + sc.isLogin);
          
      	  if (sc.isLogin == "true") {
      	    window.location.replace("/public/applicationMasterPage.html#/hybridteam");
          } else {
          	alert ("Re-enter User Name and Pass-Word.")
          }
      	  
        });

    };
}]);

//Here we get the module we created in file one
//angular.module('myApp.controllers')

// We are adding a function called Ctrl1
// to the module we got in the line above
//.controller('Ctrl1', Ctrl1);

// Inject my dependencies
//Ctrl1.$inject = ['$scope', '$http'];

// Now create our controller function with all necessary logic
//function Ctrl1($scope, $http) {
  // Logic here
//}