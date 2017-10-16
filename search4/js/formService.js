app.factory('formService', ['$rootScope', '$window',
function($rootScope, $window) {
    var $scope = $rootScope.$new(true);
    
    return {
        newCriterion: emit('new'),
        onNewCriterion: on('new'),
        updateCriterion: emit('update'),
        onUpdateCriterion: on('update'),
        removeCriterion: emit('remove'),
        onRemoveCriterion: on('remove'),
        setupCriterion: emit('setup'),
        onSetupCriterion: on('setup'),
        addCriterion: emit('add'),
        onAddCriterion: on('add')
    };
    
    function emit(type) {
        return function(criterion, onSuccess) {
            $scope.$emit(type, criterion, onSuccess || angular.noop);
        };
    };
    
    function on(type) {
        return function(func) {
            $scope.$on(type, func);
        };
    };
}]);