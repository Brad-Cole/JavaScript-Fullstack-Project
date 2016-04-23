var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    var refresh = function () {

        $scope.editMode = false;

        $scope.sumOfGameValues = 0;

    // Toggles the editMode
        $scope.editToggle = function () {
            $scope.editMode = !$scope.editMode;
        };

        $http.get('/gamedb').success(function (response) {
            $scope.gamedb = response;
            $scope.game = "";
            for (var i = 0; i < $scope.gamedb.length; i++) {
            $scope.sumOfGameValues += $scope.gamedb[i].value;
        }

    });
  };

  refresh();

  $scope.addGame = function() {
    $http.post('/gamedb', $scope.game).success(function(response) {
      refresh();
    });
    $scope.myForm.$setUntouched();
    $scope.myForm2.$setUntouched();
    $scope.myForm3.$setUntouched();
  };

  $scope.remove = function(id) {
    $http.delete('/gamedb/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    $http.get('/gamedb/' + id).success(function(response) {
      $scope.game = response;
      $scope.editMode = true;
    });
  };

  $scope.update = function() {
    $http.put('/gamedb/' + $scope.game._id, $scope.game).success(function(response) {
      $scope.editMode = false;
      refresh();
    })
    $scope.myForm.$setUntouched();
    $scope.myForm2.$setUntouched();
    $scope.myForm3.$setUntouched();
  };

  $scope.deselect = function() {
    $scope.game = "";
    $scope.editMode = false;
    $scope.myForm.$setUntouched();
    $scope.myForm2.$setUntouched();
    $scope.myForm3.$setUntouched();
  }

}]);
