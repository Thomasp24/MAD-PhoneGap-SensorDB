/**
 * Created by thomaspeters on 14-11-16.
 */

var db = null;

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
<<<<<<< HEAD
    db = window.sqlitePlugin.openDatabase({name: 'sensor.db', location: 'default'});
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Pictures (picture_location, picture_time)');
    }, function(error) {
        alert('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Populated database OK');
    });

=======
    console.log('Device Ready Called!!');

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
>>>>>>> master
    var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
    console.log('OneSignal plugin');
    window.plugins.OneSignal
        .startInit("36c8b13a-afda-4b4a-8a29-eb7ebdf2152e", "665510758144")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
<<<<<<< HEAD

    // FingerprintAuth.isAvailable(function(result) {
    //     if (result.isAvailable) {
    //         if(result.hasEnrolledFingerprints){
    //             FingerprintAuth.show({
    //                 clientId: app.client_id,
    //                 clientSecret: app.client_secret
    //             }, function (result) {
    //                 if (result.withFingerprint) {
    //                     alert("Successfully authenticated using a fingerprint");
    //                 } else if (result.withPassword) {
    //                     alert("Authenticated with backup password");
    //                 }
    //             }, function(error) {
    //                 console.log(error); // "Fingerprint authentication not available"
    //             });
    //         }else{
    //             alert("Fingerprint auth available, but no fingerprint registered on the device");
    //         }
    //     }
    // }, function(message) {
    //     alert("Cannot detect fingerprint device : "+ message);
    // });

    FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

    /**
     * @return {
 *      isAvailable:boolean,
 *      isHardwareDetected:boolean,
 *      hasEnrolledFingerprints:boolean
 *   }
     */
    function isAvailableSuccess(result) {
        alert("FingerprintAuth available: " + JSON.stringify(result));
        if (result.isAvailable) {
            FingerprintAuth.show({
                clientId: "SensorDB",
                clientSecret: "SuperSecretSensorDBKey"
            }, successCallback, errorCallback);
        }
    }

    function isAvailableError(message) {
        alert("isAvailableError(): " + message);
    }

    /**
     * @return {withFingerprint:base64EncodedString, withPassword:boolean}
     */
    function successCallback(result) {
        alert("successCallback(): " + JSON.stringify(result));
        if (result.withFingerprint) {
            alert("Successfully authenticated using a fingerprint");
        } else if (result.withPassword) {
            alert("Authenticated with backup password");
        }
    }

    function errorCallback(error) {
        alert(error); // "Fingerprint authentication not available"
    }
=======
    console.log(navigator.camera);
    //openCamera(null);
>>>>>>> master
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
        $(".body").click();

        displayImage(imageUri);

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO Pictures VALUES (?,?)', [imageUri, new Date()]);
        }, function(error) {
            alert('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Populated database OK');
        });

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