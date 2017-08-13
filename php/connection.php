<?php

$bdHost = 'localhost';
$bdLogin = 'root';
$bdPass = 'Sergey13';
$bdName = 'landing';

$connect = mysqli_connect($bdHost, $bdLogin, $bdPass, $bdName);
if (!$connect) {
    echo mysqli_connect_error();
    die;
}
