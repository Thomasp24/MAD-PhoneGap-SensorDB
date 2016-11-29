/**
 * Created by thomaspeters on 15-11-16.
 */
var compass = {

    options : {
        frequency: 1000
    },
    init: function(){
        //console.log("Compass is ready for duty!");
    },
    getHeading: function() {
        console.log(navigator.compass);
        navigator.compass.getCurrentHeading(this.onSucces, this.onError);
    },
    startWatchHeading: function(callback) {
      navigator.compass.watchHeading(callback, function(error){
          console.log('Something went wrong while getting compassHeading! #' +error.code )
      }, this.options);
    }

}
