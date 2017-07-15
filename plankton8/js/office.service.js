app.factory('officeService', ['$rootScope', '$window', 'confirm', function($rootScope, $window, $confirm) {
    var $scope  = $rootScope.$new(true);
    var _list   = $window.offices || [];
    var _source = {};
    var _nextId = 1000;
    
    $scope.map = {};
    
    var _items = function() {
        return _list;
    };
    
    var _updateMap = function() {
        var map = {};
        for (var i = 0, len = _list.length; i < len; i++) {
            map[_list[i].id] = _list[i];
        }
        $scope.map = map;
    }

    var _editItem = function(item) {
        _source = item;
        $scope.$emit('edit-item', angular.copy(item));
    };
    
    var _addItem = function() {
        $scope.$emit('edit-item');
    };
    
    var _removeItem = function(item) {
        var index = _list.indexOf(item);
        
        if (index > -1) {
            $confirm.confirm('Вы действительно хотите удалить '+ item.name +'?').then(function(){
                _list.splice(index, 1);
                _updateMap();
            }, function() {});
        }
    };
    
    var _removeAll = function() {
        $confirm.confirm('Вы действительно хотите удалить все офисы?', 'О, нет!').then(function(){
          _list.length = 0;
          _updateMap();
        }, function() {});
    };
    
    $scope.$on('update-item', function(event, item){
        angular.copy(item, _source);
    });
    
    $scope.$on('add-item', function(event, item){
        item.id = _nextId++;
        _list.unshift(item);
        _updateMap();
    });
    
    _updateMap();
    
    return {
        scope    : $scope,
        items    : _items,
        map      : $scope.map,
        edit     : _editItem,
        add      : _addItem,
        remove   : _removeItem,
        removeAll: _removeAll
    };
}])