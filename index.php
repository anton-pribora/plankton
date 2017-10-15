<?php

$list = function ($mask) {
    foreach (glob(__DIR__ .'/'. $mask) as $i => $folder) {
        yield [
            'name' => 'Этап '. ($i + 1),
            'url'  => basename($folder) .'/',
            'text' => file_exists("$folder/README.txt") ? file_get_contents("$folder/README.txt") : '',
        ];
    }
};

?>
<!doctype html>
<html lang="ru">
  <head>
    <title>Офисный планктон</title>
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js"></script>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </head>
  <body>
    <div class="container">
      <h1>Эволюция плакнтона</h1>
      <ul class="list-unstyled">
<?php foreach ($list('plankton*') as $item) {?>
        <li><a href="<?php echo $item['url']?>"><?php echo $item['name']?></a> &mdash; <?php echo $item['text']?></li>
<?php }?>
      </ul>
      <hr>
      <h2>Форма поиска для планктона</h2>
      <ul class="list-unstyled">
<?php foreach ($list('search*') as $item) {?>
        <li><a href="<?php echo $item['url']?>"><?php echo $item['name']?></a> &mdash; <?php echo $item['text']?></li>
<?php }?>
      </ul>
    </div>
  </body>
</html>