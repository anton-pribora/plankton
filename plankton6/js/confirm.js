app.factory('confirm', ['jquery', '$q', function($, $q) {
    var $dialog = $('#confirmDialog');
    var deferred;
    
    $dialog.on('click', '.confirm', function(){
        $dialog.modal('hide');
        deferred.resolve();
    });
    
    $dialog.on('click', '.reject', function(){
        $dialog.modal('hide');
        deferred.reject();
    });

    var _confirm = function(html, title) {
        deferred = $q.defer();
        
        $dialog.find('.modal-body').html(html || 'Вы действительно хотите сделать это?');
        $dialog.find('.modal-title').text(title || 'Вы уверены?');
          
        $dialog.modal('show');
        
        return deferred.promise;
    };
    
    return {
        confirm: _confirm
    }
}]);