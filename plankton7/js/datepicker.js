app.directive("ngDatepicker", ['$timeout', 'jquery', function($timeout, $) {
    return {
        restrict : 'AC',
        require : 'ngModel',
        scope : {
            ngModel: '='
        },
        link : function(scope, element, attrs) {
            var $picker = $(element).datepicker({
                language: "ru",
                clearBtn: true,
                autoclose: true,
                keepEmptyValues: true
            });
            
            $picker.on('changeDate', function(e){
                scope.ngModel = e.format();
                scope.$apply();
            });
            
            scope.$watch('ngModel', function(n,o) {
                $picker.datepicker('update', n);
            });
        }
    };
} ]);