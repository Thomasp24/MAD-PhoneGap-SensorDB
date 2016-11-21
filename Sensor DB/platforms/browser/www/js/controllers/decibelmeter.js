angular.module("decibelMeter", [])
    .controller("decibelmeter", ["$scope", function ($scope) {
        $scope.decibelmeter = {
            record: function () {
                window.navigator.device.capture.captureAudio(this.captureSuccess, this.captureError, {
                    limit: 1
                });
            },
            play: function (file) {
                if(!file) {
                    window.navigator.notification.alert("Record a sound first.", null, "Error");
                    return;
                }

                new Audio(file.fullPath).play();
            },
            captureSuccess: function (mediaFiles) {
                $scope.decibelmeter.play(mediaFiles[0]);
            },
            captureError: function (error) {
                window.navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            }
        };
    }]);