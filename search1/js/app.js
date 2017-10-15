var app = angular.module("myApp", []);

app.factory('jquery', ['$window', function($window) {
    return $window.jQuery;
}]);