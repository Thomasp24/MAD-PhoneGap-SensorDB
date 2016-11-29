/**
 * Created by thomaspeters on 14-11-16.
 */
var app = {

    client_id: "id01",
    client_secret: "secret01",
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },

    onDeviceReady: function() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['ngView']);
        });
    }
};


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal
        .startInit("36c8b13a-afda-4b4a-8a29-eb7ebdf2152e", "665510758144")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

    FingerprintAuth.isAvailable(function(result) {
        if (result.isAvailable) {
            if(result.hasEnrolledFingerprints){
                FingerprintAuth.show({
                    clientId: app.client_id,
                    clientSecret: app.client_secret
                }, function (result) {
                    if (result.withFingerprint) {
                        alert("Successfully authenticated using a fingerprint");
                    } else if (result.withPassword) {
                        alert("Authenticated with backup password");
                    }
                }, function(error) {
                    console.log(error); // "Fingerprint authentication not available"
                });
            }else{
                alert("Fingerprint auth available, but no fingerprint registered on the device");
            }
        }
    }, function(message) {
        alert("Cannot detect fingerprint device : "+ message);
    });
    console.log(navigator.camera);
    //openCamera(null);
}

function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function openCamera(selection) {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    //var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);
        window.plugins.OneSignal.postNotification({
                included_segments: ["All"],
                headings: {
                    en: {"en": "Someone took a picture!"}
                },
                contents: {
                    en: {"en": "You should also take a picture"}
                }
            },
            function(successResponse) {
                console.log("Notification Post Success:", successResponse);
            },
            function (failedResponse) {
                console.log("Notification Post Failed: ", failedResponse);
                alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
            }
        );

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function displayImage(imgUri) {

    var elem = document.getElementById('avatarImg');
    elem.src = imgUri;
}