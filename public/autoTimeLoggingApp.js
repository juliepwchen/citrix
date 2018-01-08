angular.module('autoTimeLoggingApp', ['ngRoute']).
  config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/login', 
            {
                templateUrl: 'Accounts/Login.html',
                controllerUrl: 'Accounts/LoginController'
            }).
            when('/hybridteam', 
            {
                 templateUrl: 'Citrix/HybridTeam.html',
                 controllerUrl: 'Citrix/HybridTeamController'
            }).
            otherwise({ redirectTo: '/' });
   
}]);
