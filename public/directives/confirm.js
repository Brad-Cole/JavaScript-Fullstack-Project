(function () {
    angular.module('deleteSample', []).directive('confirmDelete', function () {
        return {
            replace: true,
            templateUrl: 'templates/deleteConfirmation.html',
            scope: { onConfirm: '&' },
            controller: function ($scope) {
                $scope.isDeleting = false;
                $scope.startDelete = function () {
                    return $scope.isDeleting = true;
                };
                $scope.cancel = function () {
                    return $scope.isDeleting = false;
                };
                return $scope.confirm = function () {
                    return $scope.onConfirm();
                };
            }
        };
    }).controller('ctrl', [
      $scope.remove = function(id) {
        $http.delete('/gamedb/' + id).success(function(response) {
          refresh();
        });
      };
            };
        ]).call(this));
