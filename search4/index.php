<?php 

$escape = function($html) {
    return htmlentities($html);
};

$get = function ($name, $default = null) {
    return $_GET[$name] ?? $default;
};

$params = $get('s');

if ($params) {
    $params = base64_decode($params);
}

if ($params) {
    $params = json_decode($params, true);
}

$jsDeploy = [];

if ($params) {
    foreach ($params as list($type, $value)) {
        $jsDeploy[] = ['type' => $type, 'value' => $value];
    }
}

?>
<!doctype html>
<html ng-app="myApp" lang="ru">
  <head>
    <title>Офисный планктон</title>
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js"></script>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
    <script src="js/app.js"></script>
    <script src="js/formService.js"></script>
    <script src="js/formController.js"></script>
    <script src="js/criterionPlaceController.js"></script>
    <script src="js/criterionAgeController.js"></script>
    <script src="js/criterionEducationController.js"></script>
    <script src="js/criterionLangController.js"></script>
    <script src="js/criterionGenderController.js"></script>
    
  </head>
  <body>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="">Plankton<sup><i>Серач</i></sup></a>
        </div>
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <p class="navbar-text">Пример реализации кнопки добавлений условий для формы поиска</p>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <h1>Поискать планктон</h1>
      <div>
      
        <form class="form-inline" ng-submit="submit($event)" ng-controller="formController" method="get">
          <div>
            <div class="form-group">
              <input type="text" size="30" class="form-control" name="name" placeholder="Ф.И.О." value="<?php echo $escape($get('name'))?>">
            </div>
            <div class="form-group">
              <input type="text" size="25" class="form-control" name="post" placeholder="Должность" value="<?php echo $escape($get('post'))?>">
            </div>
            <div class="form-group">
              <div class="btn-group">
                <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">
                  <span class="glyphicon glyphicon-plus"></span>
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li ng-repeat="criterion in criteria"><a href="" ng-click="addCriterion(criterion)">{{criterion.title}}</a></li>
                </ul>
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-default">Поискать</button>
            </div>
            <input name="s" type="hidden" ng-value="encodedValues">
          </div>
          <ul class="list-inline">
            <li ng-repeat="chip in chips"><a href="" class="btn btn-default" style="margin-top: 5px;" ng-click="updateCriterion(chip)">{{chip.text}}</a></li>
          </ul>
          <pre>var chips = <?php echo json_encode($jsDeploy, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);?>;</pre>
        </form>
        
      </div>
      <div>
        <hr>
        <p class="text-muted text-right small">&copy; 2017 <a href="https://anton-pribora.ru">Антон Прибора</a></p>
      </div>
    </div>
    <form name="form" ng-controller="criterionPlaceController">
      <div class="modal fade" id="criterionPlaceDialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
              <h4 class="modal-title">Поиск по месту жительства</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Город</label>
                <input type="text" class="form-control" ng-model="criterion.value">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
              <button ng-if="showRemove" type="button" class="btn btn-danger" ng-click="remove()">Удалить</button>
              <button type="submit" class="btn btn-primary" ng-click="submit()">Подтверждаю</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
    <form name="form" ng-controller="criterionAgeController">
      <div class="modal fade" id="criterionAgeDialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
              <h4 class="modal-title">Поиск по возрасту</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>От</label>
                    <input type="text" class="form-control" ng-model="criterion.value.from">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>До</label>
                    <input type="text" class="form-control" ng-model="criterion.value.to">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
              <button ng-if="showRemove" type="button" class="btn btn-danger" ng-click="remove()">Удалить</button>
              <button type="submit" class="btn btn-primary" ng-click="submit()">Подтверждаю</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
    <form name="form" ng-controller="criterionEducationController">
      <div class="modal fade" id="criterionEducationDialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
              <h4 class="modal-title">Поиск по образованию</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <div class="checkbox" ng-repeat="(id, text) in checkboxList">
                  <label><input type="checkbox" ng-model="criterion.value[id]">{{text}}</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
              <button ng-if="showRemove" type="button" class="btn btn-danger" ng-click="remove()">Удалить</button>
              <button type="submit" class="btn btn-primary" ng-click="submit()">Подтверждаю</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
    <form name="form" ng-controller="criterionLangController">
      <div class="modal fade" id="criterionLangDialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
              <h4 class="modal-title">Поиск по владению иностранным языком</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Язык</label>
                <select class="form-control" ng-model="criterion.value.lang">
                  <option>Английский</option>
                  <option>Испанский</option>
                  <option>Немецкий</option>
                  <option>Французский</option>
                  <option value="other">Другой...</option>
                </select>
              </div>
              <div class="form-group" ng-if="criterion.value.lang == 'other'">
                <label>Укажите название языка</label>
                <input type="text" class="form-control" ng-model="criterion.value.other">
              </div>
              <div class="form-group">
                <label>Минимальный уровень</label>
                <select class="form-control" ng-model="criterion.value.level">
                  <option value="{{id}}" ng-repeat="(id, name) in langLevels">{{name}}</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
              <button ng-if="showRemove" type="button" class="btn btn-danger" ng-click="remove()">Удалить</button>
              <button type="submit" class="btn btn-primary" ng-click="submit()">Подтверждаю</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
    <form name="form" ng-controller="criterionGenderController">
      <div class="modal fade" id="criterionGenderDialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
              <h4 class="modal-title">Поиск по полу</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <div class="radio">
                      <label><input type="radio" name="gender" value="m" ng-model="criterion.value"> Мужской</label>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <div class="radio">
                      <label><input type="radio" name="gender" value="f" ng-model="criterion.value"> Женский</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
              <button ng-if="showRemove" type="button" class="btn btn-danger" ng-click="remove()">Удалить</button>
              <button type="submit" class="btn btn-primary" ng-click="submit()">Подтверждаю</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div ng-controller="initController"></div>
    <script type="text/javascript">
      app.controller('initController', ['formService', function(service){
        var chips = <?php echo json_encode($jsDeploy, JSON_UNESCAPED_UNICODE);?>;
        
        angular.forEach(chips, function(chip){
          service.setupCriterion(chip, function(){
            service.addCriterion(chip);
          });
        });
        
      }]);
    </script>
  </body>
</html>