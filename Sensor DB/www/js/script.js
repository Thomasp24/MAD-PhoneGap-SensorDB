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
    console.log('Device Ready Called!!');


    // ------------------------------------------------------------ Fingerprint ------------------------------------------------
    console.log('About to check fingerprint!');
    // if IOS
    if(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)){
        console.log('Platform is iOs!');
        alert(JSON.stringify(window.plugins));
        window.plugins.touchid.isAvailable(function() {
            window.plugins.touchid.verifyFingerprint("Scan your fingerprint please", function(msg){
                console.log("Finger scanned correctly: " + msg);
            }, function(msg){
                console.log('Something is wrong!!!!! : ' + msg);
            });
        }, function(msg) {
            console.log('Not available!');
        });
        // If Android
    }else if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
        console.log('Platform is Android...?');
        FingerprintAuth.isAvailable(function(result) {
            if (result.isAvailable) {
                if(result.hasEnrolledFingerprints){
                    FingerprintAuth.show({
                        clientId: app.client_id,
                        clientSecret: app.client_secret
                    }, function (result) {
                        if (result.withFingerprint) {
                            console.log("Successfully authenticated using a fingerprint");
                        } else if (result.withPassword) {
                            console.log("Authenticated with backup password");
                        }
                    }, function(error) {
                        console.log(error); // "Fingerprint authentication not available"
                    });
                }else{
                    console.log("Fingerprint auth available, but no fingerprint registered on the device");
                }
            }
        }, function(message) {
            alert("Cannot detect fingerprint device : "+ message);
        });
        // If other OS
    }else{
        console.log('Doet sowieso niet mee...');
    }

    // ------------------------------------------------------- Notifications -----------------------------------------------------------------
    var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    console.log('OneSignal plugin');
    window.plugins.OneSignal
        .startInit("36c8b13a-afda-4b4a-8a29-eb7ebdf2152e", "665510758144")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    console.log(navigator.camera);
    //openCamera(null);


    // ------------------------------------------ Contacts --------------------------------------------------
    //fetching the contacts can't be done after the device ready method.

    var fields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName];

    navigator.contacts.find(fields ,function(contacts){
        console.log("Found: " + contacts.length + " Contacts");
    }, null, null);

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
        window.plugins.OneSignal.getIds(function(ids) {
            window.plugins.OneSignal.postNotification({
                    headings: {
                        "en": "Someone took a picture!"
                    },
                    contents: {
                        "en": "You should also take a picture"
                    },
                    include_player_ids: [ids.userId]
                },
                function (successResponse) {
                    console.log("Notification Post Success:", successResponse);
                },
                function (failedResponse) {
                    console.log("Notification Post Failed: ", failedResponse);
                    alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
                }
            );
        });

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function displayImage(imgUri) {

    var elem = document.getElementById('avatarImg');
    elem.src = imgUri;
}