app.controller('criterionGenderController', [ '$scope', 'formService', 'jquery',
function($scope, service, $) {
    var $dialog = $('#criterionGenderDialog');
    var type = 'gender';
    var callback;
    var source;
    
    service.onNewCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == type) {
            callback          = onSuccess;
            $scope.criterion  = angular.copy(criterion);
            $scope.showRemove = false;
            
            source = false;
            
            $dialog.modal();
        };
    });
    
    service.onUpdateCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == type) {
            callback          = onSuccess;
            $scope.criterion  = angular.copy(criterion);
            $scope.showRemove = true;
            
            source = criterion;
            
            $dialog.modal();
        };
    });
    
    service.onSetupCriterion(function(event, criterion, onSuccess){
        if (criterion.type == type) {
            $scope.criterion = criterion;
            
            if (setText()) {
                onSuccess(criterion);
            }
        }
    });
    
    $scope.remove = function() {
        service.removeCriterion(source);
        $dialog.modal('hide');
    };
    
    $scope.submit = function() {
        if (setText()) {
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
    
    function setText() {
        var text = [];
        var value = $scope.criterion.value;
        
        if (value == "m") {
            text.push("мужской");
        }
        
        if (value == "f") {
            text.push("женский");
        }
        
        if (text.length) {
            $scope.criterion.text  = 'Пол: ' + text.join(" ");
            return true;
        }
        
        return false;
    };
} ]);