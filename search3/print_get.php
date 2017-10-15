<?php

header('Content-type: text/plain; charset=utf-8');

print_r($_GET);

if (isset($_GET['s'])) {
    echo "\n\nbase64 decode:\n-------------\n";
    $s = base64_decode($_GET['s']);
    print_r($s);
    
    echo "\n\njson decode:\n-------------\n";
    $a = json_decode($s, true);
    print_r($a);
}