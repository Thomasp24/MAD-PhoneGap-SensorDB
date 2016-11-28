/**
 * Created by thomaspeters on 14-11-16.
 */

var app = angular.module("sensordb", ["ngRoute"]);
    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/index.html"
            })
            .when("/overview", {
                templateUrl: "views/overview.html"
            })
            .when("/decibelmeter", {
                templateUrl: "views/decibelmeter.html"
            })
            .when("/fingerprint", {
                templateUrl: "views/fingerprint.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    });
app.controller("default", function($scope){
    $scope.$on("$routeChangeStart", function() {
       window.scrollTo(0,0);
        $(".drag-target").click();
    });
});
