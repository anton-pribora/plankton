app.controller('criterionPlaceController', [ '$scope', 'formService', 'jquery',
function($scope, service, $) {
    var $dialog = $('#criterionPlaceDialog');
    var callback;
    var source;
    
    service.onNewCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == 'place') {
            callback          = onSuccess;
            $scope.criterion  = angular.copy(criterion);
            $scope.showRemove = false;
            
            source = false;
            
            $dialog.modal();
        };
    });
    
    service.onUpdateCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == 'place') {
            callback          = onSuccess;
            $scope.criterion  = angular.copy(criterion);
            $scope.showRemove = true;
            
            source = criterion;
            
            $dialog.modal();
        };
    });
    
    $scope.remove = function() {
        service.removeCriterion(source);
        $dialog.modal('hide');
    };
    
    $scope.submit = function() {
        $scope.criterion.text  = 'Город: ' + $scope.criterion.value;
        
        if ($scope.criterion.value) {
            if (source) {
                angular.copy($scope.criterion, source);
            }
            callback($scope.criterion);
        } else {
            if (source) {
                service.removeCriterion(source);
            }
        }
        
        $dialog.modal('hide');
    };
} ]);