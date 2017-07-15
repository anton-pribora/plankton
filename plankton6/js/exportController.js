app.controller('exportController', [ '$scope', 'officeService', 'planktonService',
function($scope, o, p) {
    $scope.data = {
        'Офисы': o.items(),
        'Планктоны': p.items()
    };
} ]);