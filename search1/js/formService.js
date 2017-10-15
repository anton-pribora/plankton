app.factory('formService', ['$rootScope', '$window', 'jquery',
function($rootScope, $window, $) {
    var $scope = $rootScope.$new(true);
    
    return {
        newCriterion: newCriterion,
        onNewCriterion: onNewCriterion,
        updateCriterion: updateCriterion,
        onUpdateCriterion: onUpdateCriterion,
        removeCriterion: removeCriterion,
        onRemoveCriterion: onRemoveCriterion
    };
    
    function newCriterion(criterion, onSuccess) {
        $scope.$emit('new-criterion', criterion, onSuccess || angular.noop);
    };
    
    function onNewCriterion(func) {
        $scope.$on('new-criterion', func);
    };
    
    function updateCriterion(criterion, onSuccess) {
        $scope.$emit('update-criterion', criterion, onSuccess || angular.noop);
    };
    
    function onUpdateCriterion(func) {
        $scope.$on('update-criterion', func);
    };
    
    function removeCriterion(criterion, onSuccess) {
        $scope.$emit('remove-criterion', criterion, onSuccess || angular.noop);
    };
    
    function onRemoveCriterion(func) {
        $scope.$on('remove-criterion', func);
    };
}]);