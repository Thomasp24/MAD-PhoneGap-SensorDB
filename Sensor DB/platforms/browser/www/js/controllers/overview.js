/**
 * Created by thomaspeters on 15-11-16.
 */
angular.module("overview", [])
    .controller("overview", ["$scope", function ($scope) {
        $scope.heading = "Compass Heading: ";
        $scope.orientation = {
            availability:   "",
            gamma:          0,
            beta:           0,
            alpha:          0
        };
        document.addEventListener('deviceready', function() {
            console.log('device is ready!');
            startCompass();
            if(window.DeviceOrientationEvent){
                $scope.orientation.availability = " DeviceOrientationEvent is Available!";
                window.addEventListener('deviceorientation', function(eventData) {
                    // gamma is the left-to-right tilt in degrees, where right is positive
                    $scope.orientation.gamma = eventData.gamma;
                    // beta is the front-to-back tilt in degrees, where front is positive
                    $scope.orientation.beta = eventData.beta;
                    // alpha is the compass direction the device is facing in degrees
                    $scope.orientation.alpha = eventData.alpha
                    deviceOrientationEventHandler();
                }, false);
            } else {
                $scope.orientation.availability = "DeviceOrientationEven is not available..";
            }
        });
        function startCompass(){
            this.compas = navigator.compass;
            this.compas.watchHeading(function(heading){ // successCallback
                    $scope.heading = "Compass Heading: " + heading.magneticHeading;
                    var compassDisc = document.getElementById("compasImg");
                    compassDisc.style.webkitTransform = "rotate("+ heading.magneticHeading*-1 +"deg)";
                    compassDisc.style.MozTransform = "rotate("+ heading.magneticHeading*-1 +"deg)";
                    compassDisc.style.transform = "rotate("+ heading.magneticHeading*-1 +"deg)";

                    $scope.$apply();
                }, function(error){ // errorCallback
                    console.log('Could not retrieve compassHeading... #' + error.code);
                }, {frequency: 100}
            );
        }

        var deviceOrientationEventHandler = function(){
            // Apply the transform to the image
            var logo = document.getElementById("orientationImg");
            logo.style.webkitTransform =
                "rotate("+ $scope.orientation.gamma +"deg) rotate3d(1,0,0, "+ ($scope.orientation.beta*-1)+"deg)";
            logo.style.MozTransform = "rotate("+ $scope.orientation.gamma +"deg)";
            logo.style.transform =
                "rotate("+ $scope.orientation.gamma +"deg) rotate3d(1,0,0, "+ ($scope.orientation.beta*-1)+"deg)";
        }

    }]);