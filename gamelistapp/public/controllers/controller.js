var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	console.log("Hello world from controller");
var refresh = function() {
$http.get('/gameslist').success(function(response){
	console.log("Got data response");
	$scope.gameslist = response;
	$scope.game = "";
});
};

refresh();

$scope.addGame = function() {
	$http.post('/gameslist', $scope.game).success(function(response)  {
		refresh();
	});
};

$scope.remove = function(id) {
	$http.delete('/gameslist/'+id).success(function(response)  {
		refresh();
	});
};

$scope.edit = function(id){
	$http.get('/gameslist/' + id).success(function(response){
		$scope.game = response;
	});
};

$scope.update = function() {
	$http.put('/gameslist/' + $scope.game._id, $scope.game).success(function(response) {
		refresh();
	})
};

$scope.deselect = function() {
	$scope.game = "";
}

}]);

﻿﻿