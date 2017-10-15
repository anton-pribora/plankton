app.controller('criterionGenderController', [ '$scope', 'formService', 'jquery',
function($scope, service, $) {
    var $dialog = $('#criterionGenderDialog');
    var callback;
    var source;
    
    service.onNewCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == 'gender') {
            callback          = onSuccess;
            $scope.criterion  = angular.copy(criterion);
            $scope.showRemove = false;
            
            source = false;
            
            $dialog.modal();
        };
    });
    
    service.onUpdateCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == 'gender') {
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
        var text = [];
        
        if ($scope.criterion.value == "m") {
            text.push("мужской");
        }
        
        if ($scope.criterion.value == "f") {
            text.push("женский");
        }
        
        $scope.criterion.text  = 'Пол: ' + text.join(" ");
        
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