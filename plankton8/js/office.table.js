app.controller('officeTable', [ '$scope', 'officeService', 
function($scope, offices) {
    $scope.list = offices.items();
    $scope.pager = {
        page : 0,
        limit : 5,
        pages : []
    };

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
        offices.edit(item);
    };

    $scope.add = function() {
        offices.add();
    };

    $scope.remove = function(item) {
        offices.remove(item);
    };

    $scope.clear = function() {
        offices.removeAll();
    };
} ]);