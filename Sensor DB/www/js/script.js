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

    }
};


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {



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
        // You may choose to copy the picture, save it somewhere, or upload.
        //func(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function displayImage(imgUri) {

    var elem = document.getElementById('avatarImg');
    elem.src = imgUri;
}