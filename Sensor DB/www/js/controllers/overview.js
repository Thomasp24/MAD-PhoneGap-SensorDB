/**
 * Created by thomaspeters on 15-11-16.
 */
angular.module("overview", [])
    .controller("overview", ["$scope", function ($scope) {
        console.log('Overview controller loaded');
        var compas;
        $scope.heading = "Compass Heading: ";
        document.addEventListener('deviceready', function() {
            console.log('device is ready!');
            startCompass();
        });
        function startCompass(){
            this.compas = navigator.compass;
            this.compas.watchHeading(function(heading){ // succesCallback
                    $scope.heading = "Compass Heading: " + heading.magneticHeading;
                    $scope.$apply();
                }, function(error){ // errorCallback
                    console.log('Could not retrieve compassHeading... #' + error.code);
                }, {frequency: 500}
            );
        }
    }]);