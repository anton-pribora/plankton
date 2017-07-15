app.factory('planktonService', ['$rootScope', '$window', 'confirm', 'notify',
function($rootScope, $window, $confirm, $notify) {
    var $scope = $rootScope.$new(true);
    var _list = $window.plankton || [];
    var _source;

    var _items = function() {
        return _list;
    }

    var _addItem = function() {
        $scope.$emit('edit-item');
    };

    var _editItem = function(item) {
        _source = item;
        $scope.$emit('edit-item', angular.copy(item));
    };

    var _removeItem = function(item) {
        var index = _list.indexOf(item);

        if (index > -1) {
            $confirm.confirm('Вы действительно хотите удалить ' + item.name + '?').then(function() {
                _list.splice(index, 1);
                $notify.success('Планктон по имени "'+ item.name + '" был удалён');
            }, function() {
            });
        }
    };

    var _removeAll = function() {
        $confirm.confirm('Вы действительно хотите удалить весь планктон?', 'Ахтунг!').then(function() {
            _list.length = 0;
            $notify.success('Список планктонов был очищен');
        }, function() {
        });
    };

    $scope.$on('update-item', function(event, item) {
        angular.copy(item, _source);
        $notify.success('Данные планктона были обновлены');
    });

    $scope.$on('add-item', function(event, item) {
        _list.unshift(item);
        $notify.success('Добавлен новый планктон ' + item.name);
    });

    return {
        items : _items,
        addItem : _addItem,
        editItem : _editItem,
        removeItem : _removeItem,
        removeAll : _removeAll,
        scope : $scope
    };
} ])