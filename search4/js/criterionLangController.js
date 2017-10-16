app.controller('criterionLangController', [ '$scope', 'formService', 'jquery',
function($scope, service, $) {
    var $dialog = $('#criterionLangDialog');
    var type = 'lang';
    var callback;
    var source;
    
    $scope.langLevels = {
        b: "Базовые знания",
        r: "Читаю профессиональную литературу",
        e: "Могу проходить интервью",
        f: "Свободно владею",
        N: "Родной",
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
        var value = $scope.criterion.value;
        
        if (value && value.lang) {
            text.push(value.lang);
        }
        
        if (value && value.level) {
            text.push($scope.langLevels[value.level]);
        }
        
        if (text.length == 2) {
            $scope.criterion.text  = 'Язык: ' + text[0] + " (" + text[1] + ")";
            return true;
        }
        
        return false;
    };
} ]);