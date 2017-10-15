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
    
    $scope.$watch('chips.length', function(n,o){
        var values = [];
        
        if (n) {
            angular.forEach($scope.chips, function(chip) {
                values.push([chip.type, chip.value]);
            });
        }
    
        $scope.encodedValues = b64EncodeUnicode(angular.toJson(values));
    });
    
    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }

} ]);