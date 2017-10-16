app.controller('criterionEducationController', [ '$scope', 'formService', 'jquery',
function($scope, service, $) {
    var $dialog = $('#criterionEducationDialog');
    var type = 'education';
    var callback;
    var source;
    
    $scope.checkboxList = {
        e: "Начальное",
        m: "Среднее",
        s: "Средне-специальное",
        i: "Неполное высшее",
        u: "Высшее"
    };
    
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
        
        angular.forEach($scope.criterion.value, function(value, key){
            if (value) {
                text.push($scope.checkboxList[key]);
            }
        });
        
        if (text.length) {
            $scope.criterion.text = 'Образование: ' + text.join(", ");
            return true;
        }
        
        return false;
    };
} ]);