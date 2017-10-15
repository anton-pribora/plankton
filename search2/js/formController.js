app.controller('formController', [ '$scope', 'formService',
function($scope, service) {
    $scope.criteria = [
        {title: 'Место жительства', type: "place"    },
        {title: 'Возраст'         , type: 'age'      },
        {title: 'Образование'     , type: 'education'},
        {title: 'Владение языком' , type: 'lang'     },
        {title: 'Пол'             , type: 'gender'   }
    ];
    
    $scope.chips = [
    ];
    
    $scope.addCriterion = function(criterion) {
        service.newCriterion(criterion, function(criterion){
            $scope.chips.push(criterion);
        });
    };
    
    $scope.updateCriterion = function(criterion) {
        service.updateCriterion(criterion);
    };
    
    service.onRemoveCriterion(function(event, criterion){
        var index = $scope.chips.indexOf(criterion);
        
        if (index > -1) {
            $scope.chips.splice(index, 1);
        }
    });
    
    $scope.toObject = function(value) {
        return angular.isObject(value) ? value : {value: value};
    };
} ]);