app.controller('editPlankton', [ '$scope', 'planktonService', 'officeService', 'jquery', 
function($scope, service, offices, $) {
    var $dialog = $('#editPlankton');

    $scope.newItem = true;
    $scope.item = {};
    $scope.offices = offices.items();

    service.scope.$on('edit-item', function(event, item) {
        $scope.newItem = item == undefined;
        $scope.item = item || {};
        $dialog.modal('show');
    });
    
    $scope.submit = function() {
        $dialog.modal('hide');

        if ($scope.newItem) {
            service.scope.$emit('add-item', $scope.item);
        } else {
            service.scope.$emit('update-item', $scope.item);
        }
    };
} ]);