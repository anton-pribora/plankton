app.controller('editOffice', [ '$scope', 'officeService', 'jquery', 
function($scope, offices, $) {
    var $dialog = $('#editOffice');

    $scope.newItem = true;
    $scope.item = {};

    offices.scope.$on('edit-item', function(event, item) {
        $scope.newItem = item == undefined;
        $scope.item = item || {};
        $dialog.modal('show');
    });

    $scope.submit = function() {
        $dialog.modal('hide');

        if ($scope.newItem) {
            offices.scope.$emit('add-item', $scope.item);
        } else {
            offices.scope.$emit('update-item', $scope.item);
        }
    };
} ]);