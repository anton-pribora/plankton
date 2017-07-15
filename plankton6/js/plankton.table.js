app.controller('planktonTable', ['$scope', 'planktonService', 'officeService',
function($scope, service, offices) {
    $scope.list = service.items();
    $scope.pager = {};

    $scope.pager.page = 0;
    $scope.pager.limit = 5;
    $scope.pager.pages = [];
    $scope.offices = offices.map;

    offices.scope.$watch('map', function(n, o) {
        $scope.offices = n;
    });

    var recalcPages = function(newLength, oldLength) {
        var newPages = Math.ceil(($scope.list.length || 1) / $scope.pager.limit);
        $scope.pager.pages = Array.from(Array(newPages).keys());

        if (oldLength < newLength) {
            $scope.pager.page = 0;
        } else if ($scope.pager.page > newPages - 1) {
            $scope.pager.page = newPages - 1;
        }
    };

    $scope.$watch('list.length', recalcPages);
    $scope.$watch('pager.limit', recalcPages);

    $scope.edit = function(item) {
        service.editItem(item);
    };

    $scope.add = function() {
        service.addItem();
    };

    $scope.remove = function(item) {
        service.removeItem(item);
    };

    $scope.clear = function() {
        service.removeAll();
    };
} ]);