/**
 * Created by Gert on 6-12-2016.
 */
angular.module("contacts", [])
    .controller("contacts", ["$scope", function ($scope) {

        //alle contacten ophalen
        window.contacts.find(window.contacts.fieldType(contacts), function(contacts) {
            $scope.contacts = contacts
        })
    }]);