app.directive("ngSelect2", ['$timeout', 'jquery', function($timeout, $) {
    return {
        restrict : 'AC',
        require : 'ngModel',
        scope : {
            ngModel: '='
        },
        link : function(scope, element, attrs) {
            var $e = $(element);
            
            $e.on('change', function(e){
                scope.ngModel = $e.val();
                scope.$apply();
            });
            
            scope.$watch('ngModel', function(n,o) {
                $timeout(function() {
                    $e.val(n).trigger('change');
                });
            });
        }
    };
} ]);