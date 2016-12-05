angular.module("database", [])
    .controller("db", ["$scope", function ($scope) {
        var db = window.db;
        $scope.pictures = [];

        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM Pictures', [], function(tx, rs) {
                // alert('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                for (var i = 0; i < rs.rows.length; i++) {
                    $scope.pictures.push(rs.rows.item(i));
                }
            }, function(tx, error) {
                alert('SELECT error: ' + error.message);
            });
        });
    }]);