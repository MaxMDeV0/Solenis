
<?php


if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $json = array();
    foreach ($_POST as $key => $value){
        $obj['titre'] = str_replace("_", " ", $key);
        $obj['contenu'] = $value;
        array_push($json, $obj);
    }
    echo json_encode($json);
    $encode = json_encode($json);
    $test = json_decode($encode);
    var_dump($test);
}


