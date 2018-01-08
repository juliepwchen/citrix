var app = angular.module('autoTimeLoggingApp');
app.controller("LogoutController", ['$scope', '$rootScope', function(sc, rs) {

    sc.login = function () {
    	sc.isLogin = "";
    	window.location.replace("/public/index.html");
    };
}]);