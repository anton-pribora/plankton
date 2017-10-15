app.controller('criterionAgeController', [ '$scope', 'formService', 'jquery',
function($scope, service, $) {
    var $dialog = $('#criterionAgeDialog');
    var callback;
    var source;
    
    service.onNewCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == 'age') {
            callback          = onSuccess;
            $scope.criterion  = angular.copy(criterion);
            $scope.showRemove = false;
            
            source = false;
            
            $dialog.modal();
        };
    });
    
    service.onUpdateCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == 'age') {
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
        var value = $scope.criterion.value;
        var text = [];
        
        if (value && value.from) {
            text.push("от " + $scope.criterion.value.from);
        }
        
        if (value && value.to) {
            text.push("до " + $scope.criterion.value.to);
        }
        
        if (text.length) {
            $scope.criterion.text  = 'Возраст: ' + text.join(" ");
            
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