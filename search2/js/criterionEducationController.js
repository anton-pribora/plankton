app.controller('criterionEducationController', [ '$scope', 'formService', 'jquery',
function($scope, service, $) {
    var $dialog = $('#criterionEducationDialog');
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
        if (criterion.type == 'education') {
            callback          = onSuccess;
            $scope.criterion  = angular.copy(criterion);
            $scope.showRemove = false;
            
            source = false;
            
            $dialog.modal();
        };
    });
    
    service.onUpdateCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == 'education') {
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
        
        angular.forEach($scope.criterion.value, function(value, key){
            if (value) {
                text.push($scope.checkboxList[key]);
            }
        });
        
        if (text.length) {
            $scope.criterion.text = 'Образование: ' + text.join(", ");
            
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