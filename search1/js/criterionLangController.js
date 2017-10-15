app.controller('criterionLangController', [ '$scope', 'formService', 'jquery',
function($scope, service, $) {
    var $dialog = $('#criterionLangDialog');
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
        if (criterion.type == 'lang') {
            callback          = onSuccess;
            $scope.criterion  = angular.copy(criterion);
            $scope.showRemove = false;
            
            source = false;
            
            $dialog.modal();
        };
    });
    
    service.onUpdateCriterion(function(event, criterion, onSuccess) {
        if (criterion.type == 'lang') {
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
        
        if (value.lang) {
            text.push(value.lang);
        }
        
        if (value.level) {
            text.push($scope.langLevels[value.level]);
        }
        
        if (text.length == 2) {
            $scope.criterion.text  = 'Язык: ' + text[0] + " (" + text[1] + ")";
            
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