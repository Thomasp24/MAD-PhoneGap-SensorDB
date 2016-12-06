/**
 * Created by thomaspeters on 14-11-16.
 */


var app = angular.module("sensordb", ["ngRoute", "overview", "decibelMeter", "database", "battery"]);
    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/index.html"
            })
            .when("/overview", {
                templateUrl: "views/overview.html",
                controller: "overview"
            })
            .when("/database", {
                templateUrl: "views/database.html",
                controller: "db"
            })
            .when("/decibelmeter", {
                templateUrl: "views/decibelmeter.html",
                controller: "decibelmeter"
            })
            .when("/fingerprint", {
                templateUrl: "views/fingerprint.html"
            })
            .when("/battery", {
                templateUrl: "views/battery.html",
                controller: "battery"
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
