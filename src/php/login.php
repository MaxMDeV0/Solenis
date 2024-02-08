<?php

if($_SERVER['REQUEST_METHOD']=='POST'){
    $json = file_get_contents('php://input');

// Décodage du JSON en tableau associatif
    $data = json_decode($json, true);
    if(isset($data['mdp']) && isset($data['user'])){
        if($data['mdp'] =='mdp' && $data['user']=='salki'){
            $cookie = rand(1,1000000000);
            $json = array(
                "cookie" => $cookie,

            );
            setcookie('Auth', $cookie, time()+3600);
            file_put_contents('auth/cookie.json', json_encode($json) );

        }
    }
}



